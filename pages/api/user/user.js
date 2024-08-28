import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";
import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "../../../db/ConnectDB";
import UserModel from "../../../models/user.models";
import { generateUniqueID } from "../../../utils/UniqueId";
import { passGenerator } from "../../../utils/PassGenerate";
import nodemailer from "nodemailer";

export default async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (session?.user?.role == "Admin") {
        if (req.method === "POST") {
            connectDB();
            try {

                let userid = generateUniqueID()
                let user_pass = passGenerator();
                const hash = bcrypt.hashSync(user_pass?.toString(), 15);

                await UserModel.create({
                    employee_id: userid,
                    ...req.body,
                    password: hash,
                });


                await fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${process.env.NEXT_APP_EMAIL_KEY}`,
                    },
                    body: JSON.stringify({
                        from: process.env.NEXT_APP_USER_MAIL,
                        to: [req.body.employee_email],
                        subject: 'CHECKUPHEALTH LOGIN CREDIENTIAL',
                        html: ` 
                    <p>*** please keep this information secret ***</p> <br/>
                    Login & Employee ID - ${userid}<br/>
                    Password - ${user_pass}
                    `,
                    }),
                });

                return res
                    .status(201)
                    .json({ message: "User Added" });

            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
        if (req.method === "GET") {
            connectDB();
            try {
                const user = await UserModel.find().sort("-createdAt");
                return res.status(200).json(user);
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
        if (req.method === "DELETE") {
            connectDB();
            try {
                await UserModel.findByIdAndDelete(req.query.id).sort("-createdAt");
                return res.status(200).json({ message: "user deleted" });
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
    } else {
        res.status(400).json({ message: "Not Authorized" });
    }
};
