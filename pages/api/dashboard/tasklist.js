import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";

import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "../../../db/ConnectDB";
import TaskModel from "../../../models/task.models";
import TaskAsignModel from "../../../models/taskasign.models";

export default async (req, res) => {
    const session = await getServerSession(req, res, authOptions);
    if (session) {
        if (req.method === "GET") {
            connectDB();
            try {
                const { startdate, enddate, assignto } = req.query;
                const data = await TaskModel.find({
                    date: {
                        $gte: startdate,
                        $lte: enddate
                    }, assignto: assignto
                }).sort("-createdAt");
                return res.status(201).json(data);
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }

        }


    } else {
        res.status(200).json({ message: "Not Authorized" });
    }
};
