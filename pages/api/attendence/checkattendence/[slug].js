import { getServerSession } from "next-auth";

import { authOptions } from "../../auth/[...nextauth]";
import { connectDB } from "../../../../db/ConnectDB";
import QrModel from "../../../../models/qrattendence.models"
import Employee from "../../../../models/employee.models"

export default async (req, res) => {
    const session = await getServerSession(req, res, authOptions);
    if (session) {
        if (req.method === "GET") {
            connectDB();
            const data = await QrModel.findById(req.query.slug).populate("employee_id")
            return res.status(200).json(data);
        }
    } else {
        res.status(400).json({ message: "Not Authorized" });
    }

};
