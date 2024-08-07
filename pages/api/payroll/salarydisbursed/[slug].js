import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";
import { authOptions } from "../../auth/[...nextauth]";
import { connectDB } from "../../../../db/ConnectDB";
import SalarySetupModel from "../../../../models/salarysetup.model";
import RazorpayModel from "../../../../models/razorpay.models";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        return res.status(401).json({ message: "Not Authorized" });
    }

    connectDB();

    if (req.method === "GET") {
        try {
            const generatesalary = await SalarySetupModel.find({
                salary_id: req.query.slug,
            });
            return res.status(200).json(generatesalary);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Something Went Wrong" });
        }
    }

    if (req.method === "PUT") {
        try {
            const razorpayCredential = await RazorpayModel.findOne({
                id: "razorpaycredientialid",
            });

            const auth = Buffer.from(
                `${razorpayCredential?.key_id}:${razorpayCredential?.secret_id}`
            ).toString("base64");

            for (const element of req.body) {
                const idempotencyKey = uuidv4();
                const salaryDisbursed = await SalarySetupModel.findById(element.id);

                if (salaryDisbursed?.fund_id) {
                    const { data } = await axios.post(
                        `${process.env.NEXT_APP_RAZORPAY_API}/v1/payouts`,
                        {
                            account_number: razorpayCredential?.account_number,
                            fund_account_id: salaryDisbursed?.fund_id,
                            amount: parseInt(salaryDisbursed?.salarytype?.grossSalary) * 100,
                            currency: "INR",
                            mode: "NEFT",
                            purpose: "salary",
                            queue_if_low_balance: true,
                        },
                        {
                            headers: {
                                "X-Payout-Idempotency": idempotencyKey,
                                "Content-Type": "application/json",
                                Authorization: `Basic ${auth}`,
                            },
                        }
                    );

                    await SalarySetupModel.findByIdAndUpdate(salaryDisbursed._id, {
                        payout_id: data.id,
                        isDisbursed: true
                    });
                } else {
                    return res.status(400).json({
                        message: `Add Fund Account to Employee ${salaryDisbursed?.employee_first_name} ${salaryDisbursed?.employee_last_name}`,
                    });
                }
            }

            return res.status(200).json({ message: "Salary Disbursed" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Something Went Wrong" });
        }
    }

    return res.status(405).json({ message: "Method Not Allowed" });
};

