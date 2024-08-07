import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";

import { authOptions } from "../../auth/[...nextauth]";
import { connectDB } from "../../../../db/ConnectDB";
import LeaveModel from "../../../../models/leave.models"

export default async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        if (req.method === "GET") {
            connectDB();
            try {
                const { startdate, enddate, slug } = req.query;
                const data = await LeaveModel.find({
                    date: {
                        $gte: startdate,
                        $lte: enddate
                    }, employee_id: slug
                });
                return res.status(201).json(data);
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
        if (req.method === "PUT") {
            connectDB();
            try {
                await LeaveModel.findByIdAndUpdate(req.query.slug, {
                    isAproved: req.body.isAproved
                });
                return res.status(201).json({ message: "Status Updated" });
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
        if (req.method === "DELETE") {
            connectDB();
            try {
                await LeaveModel.findByIdAndDelete(req.query.slug);
                return res.status(201).json({ message: "Applocation Delete" });
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }

    } else {
        res.status(400).json({ message: "Not Authorized" });
    }
};
