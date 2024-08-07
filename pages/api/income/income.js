import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";

import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "../../../db/ConnectDB";
import IncomeModel from "../../../models/income.models";
import "../../../models/IncomeCategory.models";

export default async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        if (req.method === "POST") {
            connectDB();
            try {
                await IncomeModel.create({ ...req.body });
                return res.status(201).json({ message: "Income Added" });
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
                    const incomedata = await IncomeModel.findById(req.query.id)
                    return res.status(200).json(incomedata);
                } else {
                    const incomedata = await IncomeModel.find({
                        date: {
                            $gte: startdate,
                            $lte: enddate
                        }
                    }).populate("category").sort("-createdAt");
                    return res.status(200).json(incomedata);
                }

            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
        if (req.method === "PUT") {
            connectDB();
            try {
                await IncomeModel.findByIdAndUpdate(req.query.id, req.body)
                return res.status(201).json({ message: "Income Updated" });
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
        if (req.method === "DELETE") {
            connectDB();
            try {
                await IncomeModel.findByIdAndDelete(req.query.id)
                return res.status(201).json({ message: "Income Deleted" });
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
    } else {
        res.status(400).json({ message: "Not Authorized" });
    }
};
