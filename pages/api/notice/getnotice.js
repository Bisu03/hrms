import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";

import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "../../../db/ConnectDB";
import NoticeModel from "../../../models/notice.models";

export default async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        if (req.method === "GET") {
            connectDB();
            try {
                const notice = await NoticeModel.find().sort("-date");
                return res.status(200).json(notice);
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
    } else {
        res.status(200).json({ message: "Not Authorized" });
    }
};
