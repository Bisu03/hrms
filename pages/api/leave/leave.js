import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";

import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "../../../db/ConnectDB";
import LeaveModel from "../../../models/leave.models"
import Employee from "../../../models/employee.models"

export default async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        if (req.method === "POST") {
            connectDB();
            try {
                await LeaveModel.create({ ...req.body, });
                return res.status(201).json({ message: "Application Submited" });
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }

        if (req.method === "GET") {
            connectDB();
            try {
                const { startdate, enddate, } = req.query;
                const data = await LeaveModel.find({
                    date: {
                        $gte: startdate,
                        $lte: enddate
                    }
                }).populate('employee_id').sort("-createdAt")
                return res.status(201).json(data);
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }

        // if (req.method === "DELETE") {
        //     connectDB();
        //     try {
        //         await NoticeModel.findByIdAndDelete(req.query.id);
        //         return res.status(201).json({ message: "Notice Delete" });
        //     } catch (error) {
        //         console.error(error);
        //         return res.status(401).json({ message: "Something Went Wrong" });
        //     }
        // }

    } else {
        res.status(400).json({ message: "Not Authorized" });
    }
};
