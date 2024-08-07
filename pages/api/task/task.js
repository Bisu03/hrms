import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";

import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "../../../db/ConnectDB";
import TaskModel from "../../../models/task.models";
import EmployeeModel from "../../../models/employee.models";
import TaskAsignModel from "../../../models/taskasign.models";

export default async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        if (req.method === "POST") {
            connectDB();
            try {

                for (let i = 0; i < req.body.date.length; i++) {
                    for (let j = 0; j < req.body.assignto.length; j++) {
                        await TaskModel.create({
                            title: req.body.title,
                            description: req.body.description,
                            assignto: req.body.assignto[j],
                            assignby: req.body.assignby,
                            date: req.body.date[i],
                        });
                    }
                }
                return res.status(201).json({ message: "Task Created" });
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
        if (req.method === "GET") {
            connectDB();
            try {
                const { startdate, enddate, assignby } = req.query;
                const data = await TaskModel.find({
                    date: {
                        $gte: startdate,
                        $lte: enddate
                    }, assignby: assignby
                }).populate("assignto").sort("-createdAt");
                return res.status(201).json(data);
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
        if (req.method === "PUT") {
            connectDB();
            try {
                await TaskModel.findByIdAndUpdate(req.query.id, {
                    ...req.body
                })
                return res.status(201).json({ message: "Task Updated" });
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
        if (req.method === "DELETE") {
            connectDB();
            try {
                await TaskModel.findByIdAndDelete(req.query.id)
                return res.status(201).json({ message: "Task Deleted" });
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }

    } else {
        res.status(400).json({ message: "Not Authorized" });
    }
};
