import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";

import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "../../../db/ConnectDB";
import TaskModel from "../../../models/task.models";
import TaskAsignModel from "../../../models/taskasign.models";

export default async (req, res) => {
    const session = await getServerSession(req, res, authOptions);
    if (session) {
        if (req.method === "POST") {
            connectDB();
            try {
                await TaskAsignModel.create({ ...req.body });
                return res.status(201).json({ message: "Message Posted" });
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
        if (req.method === "GET") {
            connectDB();
            try {
                const data = await TaskAsignModel.find({ taskid: req.query.id }).populate("taskid").sort("-createdAt")
                return res.status(201).json(data);
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
        if (req.method === "DELETE") {
            connectDB();
            try {
                await TaskAsignModel.findByIdAndDelete(req.query.id)
                return res.status(201).json({ message: "Message Deleted" });
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }


    } else {
        res.status(400).json({ message: "Not Authorized" });
    }
};
