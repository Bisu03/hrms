import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";

import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "../../../db/ConnectDB";
import QrModel from "../../../models/qrlist.models"

export default async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        if (req.method === "POST") {
            connectDB();
            const data = await QrModel.create(req.body)
            return res.status(200).json(data);
        }
        if (req.method === "GET") {
            connectDB();
            const { startdate, enddate } = req.query;
            const data = await QrModel.find({
                date: {
                    $gte: startdate,
                    $lte: enddate
                }
            })
            return res.status(200).json(data);
        }

    } else {
        res.status(400).json({ message: "Not Authorized" });
    }

};
