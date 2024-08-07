import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";

import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "../../../db/ConnectDB";
import RazorpayModel from "../../../models/razorpay.models";
import EmployeeModel from "../../../models/employee.models";
import axios from "axios";

export default async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        if (req.method === "POST") {
            await connectDB();
            try {
                const razorpaycredieltial = await RazorpayModel.findOne({
                    id: "razorpaycredientialid",
                });

                if (razorpaycredieltial) {
                    const auth = Buffer.from(
                        `${razorpaycredieltial?.key_id}:${razorpaycredieltial?.secret_id}`
                    ).toString("base64");

                    for (let i = 0; i < req.body.length; i++) {
                        const { id: empid, name, email, contact, bankinfo } = req.body[i];

                        const { data: contactId } = await axios.post(
                            `${process.env.NEXT_APP_RAZORPAY_API}/v1/contacts`,
                            {
                                name,
                                email,
                                contact,
                                type: "employee",
                            },
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Basic ${auth}`,
                                },
                            }

                        );

                        if (contactId?.id) {
                            const { data: fundAccountResponse } = await axios.post(
                                `${process.env.NEXT_APP_RAZORPAY_API}/v1/fund_accounts`,
                                {
                                    contact_id: contactId.id,
                                    account_type: "bank_account",
                                    bank_account: {
                                        name: bankinfo?.banknane,
                                        ifsc: bankinfo?.ifsccode,
                                        account_number: bankinfo?.accountnumber,
                                    },
                                },
                                {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Basic ${auth}`,
                                    },
                                }
                            );

                            if (fundAccountResponse?.id) {
                                await EmployeeModel.findByIdAndUpdate(empid, {
                                    contact_id: contactId?.id,
                                    fund_id: fundAccountResponse?.id,
                                    isSalaryAccountCreate: true
                                })
                            }
                        }

                    }
                    return res.status(200).json({ message: "Account created successfully" });


                } else {
                    return res.status(200).json({ message: "Add Razorpay Account" });
                }
            } catch (error) {
                console.error("Internal server error:", error);
                return res.status(500).json({ message: "Internal Server Error" });
            }
        } else {
            res.status(405).json({ message: "Method Not Allowed" });
        }
    } else {
        res.status(401).json({ message: "Not Authorized" });
    }
};
