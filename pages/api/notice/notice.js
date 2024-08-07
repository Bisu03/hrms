import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";

import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "../../../db/ConnectDB";
import NoticeModel from "../../../models/notice.models";

export default async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        if (req.method === "POST") {
            connectDB();
            try {
                await NoticeModel.create({ ...req.body });
                return res.status(201).json({ message: "Notice Publiced" });
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
        if (req.method === "DELETE") {
            connectDB();
            try {
                await NoticeModel.findByIdAndDelete(req.query.id);
                return res.status(201).json({ message: "Notice Delete" });
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }

    } else {
        res.status(400).json({ message: "Not Authorized" });
    }
};
