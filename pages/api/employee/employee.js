import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";

import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "../../../db/ConnectDB";
import EmployeeModel from "../../../models/employee.models";
import CounterModel from "../../../models/counter.models";
import UserModel from "../../../models/user.models";
import DepartmentModel from "../../../models/department.models";
import { passGenerator } from "../../../utils/PassGenerate";
import nodemailer from "nodemailer";

export default async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        if (req.method === "POST") {
            connectDB();
            try {
                let seqdata;
                seqdata = await CounterModel.findOneAndUpdate(
                    {
                        id: "employeeid",
                    },
                    {
                        $inc: { seq: 1 },
                    },
                    { new: true }
                );

                if (seqdata == null) {
                    seqdata = await CounterModel.create({
                        id: "employeeid",
                        seq: 1000001,
                    });
                }

                let user_pass = passGenerator();
                const hash = bcrypt.hashSync(user_pass?.toString(), 15);
                const Permission = await DepartmentModel.findById(req.body.department)

                if (seqdata != null) {
                    const data = await EmployeeModel.create({
                        ...req.body,
                        employee_id: seqdata.seq,
                    });

                    await UserModel.create({
                        empobj_id: data._id,
                        depobj_id: req.body.department,
                        employee_name:
                            req.body.employee_first_name + " " + req.body.employee_last_name,
                        employee_id: seqdata.seq,
                        ...req.body,
                        role: "Employee",
                        permission: Permission?.permission,
                        password: hash,
                    });

           
                    await fetch('https://api.resend.com/emails', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${process.env.NEXT_APP_EMAIL_KEY}`,
                        },
                        body: JSON.stringify({
                            from: process.env.NEXT_APP_USER_MAIL,
                            to: [req.body.employee_email],
                            subject: 'CHECKUPHEALTH LOGIN CREDIENTIAL',
                            html: `
                            <p>*** please keep this information secret ***</p> <br/>
                            Login & Employee ID - ${seqdata?.seq}<br/>
                            Password  - ${user_pass} <br/>
                            Portal Link Address - https://emp.checkuphealth.in
                            `,
                        }),
                    });


                    return res
                        .status(201)
                        .json({ message: "Employee Registered", id: data._id });
                }
            } catch (error) {
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
        if (req.method === "GET") {
            connectDB();
            try {
                const { firstName, page = 1, limit = 10 } = req.query;

                let filter = {};

                if (firstName) {
                    filter.employee_first_name = { $regex: firstName, $options: "i" }; // Case-insensitive regex search
                }

                const pageNumber = parseInt(page, 10);
                const pageSize = parseInt(limit, 10);

                const skip = (pageNumber - 1) * pageSize;

                const employees = await EmployeeModel.find(filter,"profile employee_id employee_first_name employee_last_name employee_email department").populate("department").sort("-createdAt").skip(skip)
                    .limit(pageSize);
                ;
                const totalCount = await EmployeeModel.countDocuments(filter);

                const totalPages = Math.ceil(totalCount / pageSize);
                return res.status(200).json({
                    employees, pagination: {
                        totalCount,
                        totalPages,
                        currentPage: pageNumber,
                        pageSize
                    }
                });
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
    } else {
        return res.status(400).json({ message: "Not Authorized" });
    }
};
