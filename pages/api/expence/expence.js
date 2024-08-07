import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";

import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "../../../db/ConnectDB";
import ExpenceModel from "../../../models/expences.models";
import "../../../models/ExpenceCategory.models";

export default async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        if (req.method === "POST") {
            connectDB();
            try {
                await ExpenceModel.create({ ...req.body });
                return res.status(201).json({ message: "Expence Added" });
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
        if (req.method === "GET") {
            connectDB();
            try {
                const { startdate, enddate } = req.query;

                if (req.query.id) {
                    const expencedata = await ExpenceModel.findById(req.query.id)
                    return res.status(200).json(expencedata);
                } else {
                    const expencedata = await ExpenceModel.find({
                        date: {
                            $gte: startdate,
                            $lte: enddate
                        }
                    }).populate("category").sort("-createdAt");
                    return res.status(200).json(expencedata);
                }

            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
        if (req.method === "PUT") {
            connectDB();
            try {
                await ExpenceModel.findByIdAndUpdate(req.query.id, req.body)
                return res.status(201).json({ message: "Expence Updated" });
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
        if (req.method === "DELETE") {
            connectDB();
            try {
                 await ExpenceModel.findByIdAndDelete(req.query.id)
                return res.status(200).json({ message: "Expence Deleted" });
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
    } else {
        res.status(400).json({ message: "Not Authorized" });
    }
};
