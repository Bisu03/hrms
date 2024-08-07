import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";

import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "../../../db/ConnectDB";
import SalarySeltupModel from "../../../models/salarysetup.model";
import SalaryGenerateModel from "../../../models/generatesalary.models";
import EmployeeModel from "../../../models/employee.models";

export default async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        if (req.method === "POST") {
            connectDB();
            try {
                const generatesalary = await SalaryGenerateModel.create(req.body);
                const Employeesdata = await EmployeeModel.find();

                if (Employeesdata) {
                    for (let index = 0; index < Employeesdata?.length; index++) {
                        let Employees = Employeesdata[index];
                        await SalarySeltupModel.create({
                            employee: Employees._id,
                            department: Employees.department,
                            salary_id: generatesalary._id,
                            profile: Employees.profile,
                            employee_id: Employees.employee_id,
                            employee_first_name: Employees.employee_first_name,
                            employee_last_name: Employees.employee_last_name,
                            employee_email: Employees.employee_email,
                            contact_id: Employees.contact_id,
                            fund_id: Employees.fund_id,
                            salarytype: Employees.salarytype,
                            salary_mnth: req.body.salary_mnth,
                            salary_year: req.body.salary_year,
                            salary_date: req.body.salary_date,
                        });
                    }
                }

                return res.status(201).json(generatesalary);
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
        if (req.method === "GET") {
            connectDB();
            try {
                const generatesalary = await SalaryGenerateModel.find({
                    salary_mnth: req.query.salary_mnth,
                    salary_year: req.query.salary_year,
                });
                return res.status(200).json(generatesalary);
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
    } else {
        return res.status(400).json({ message: "Not Authorized" });
    }
};
