import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";

import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "../../../db/ConnectDB";
import SalaryTypeModel from "../../../models/salarytype.moodels";

export default async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        if (req.method === "POST") {
            connectDB();
            try {
                await SalaryTypeModel.create({ ...req.body });
                return res.status(201).json({ message: "Type Added" });
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
        if (req.method === "GET") {
            connectDB();
            try {
                const salarytypes = await SalaryTypeModel.find();
                return res.status(200).json(salarytypes);
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
        if (req.method === "DELETE") {
            connectDB();
            try {
                await SalaryTypeModel.findByIdAndDelete(req.query.id)
                return res.status(201).json({ message: "Type Deleted" });
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
    } else {
        return res.status(400).json({ message: "Not Authorized" });
    }
};
