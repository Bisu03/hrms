import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";
import { authOptions } from "../../auth/[...nextauth]";
import { connectDB } from "../../../../db/ConnectDB";
import UserModel from "../../../../models/user.models";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { passGenerator } from "../../../../utils/PassGenerate";
// import { generateUniqueID } from "../../../utils/UniqueId";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (req.method === "POST") {
        connectDB();
        try {
            const user = await UserModel.findOne({
                employee_email: req.body.email,
            });
            if (user) {
                const otp = passGenerator();
                let email = user.employee_email;
                const token = jwt.sign({ email, otp }, process.env.NEXT_APP_JWT_SECRET, {
                    expiresIn: "10m",
                });

                await fetch("https://api.resend.com/emails", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.NEXT_APP_EMAIL_KEY}`,
                    },
                    body: JSON.stringify({
                        from: process.env.NEXT_APP_USER_MAIL,
                        to: [email],
                        subject: "HR OTP",
                        html: ` 
                        <p>*** please keep this information secret ***</p> <br/>
                        Employee ID - ${user?.employee_id}<br/>
                        Otp for rest password 10 minuites validity <br/>
                         ${otp}
                        `,
                    }),
                });

                return res.status(200).json(token);
            } else {
                return res.status(200).json({ notfound: "Email Not Found" });
            }
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: "Something Went Wrong" });
        }
    }
    if (req.method === "PUT") {
        connectDB();
        try {


            const decoded = jwt.verify(req.query.slug, process.env.NEXT_APP_JWT_SECRET);

            const { otp, password } = req.body
            const hash = bcrypt.hashSync(password?.toString(), 15);

            if (otp == decoded.otp) {
                await UserModel.findOneAndUpdate(
                    {
                        employee_email: decoded.email,
                    },
                    {
                        password: hash,
                    }
                );
                return res.status(200).json({ message: "Password Update" });

            } else {
                return res.status(200).json({ otpmatch: "otp not match" });
            }
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: "Something Went Wrong" });
        }
    }

};
