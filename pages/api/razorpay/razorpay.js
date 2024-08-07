import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";

import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "../../../db/ConnectDB";
import RazorpayModel from "../../../models/razorpay.models";

export default async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        if (req.method === "POST") {
            connectDB();
            try {
                const razorpaycredieltial = await RazorpayModel.findOne({ id: "razorpaycredientialid" })

                if (razorpaycredieltial) {
                    await RazorpayModel.findOneAndUpdate({ id: "razorpaycredientialid" },req.body)
                } else {
                    await RazorpayModel.create({
                        id: "razorpaycredientialid", ...req.body
                    })
                }
                return res.status(201).json({ message: "Razorpay Added" });
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
        if (req.method === "GET") {
            connectDB();
            try {
                const razorpaycredieltial = await RazorpayModel.findOne({ id: "razorpaycredientialid" })
                return res.status(200).json(razorpaycredieltial);
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
    } else {
        res.status(400).json({ message: "Not Authorized" });
    }
};
