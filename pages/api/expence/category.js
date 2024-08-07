import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";
import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "../../../db/ConnectDB";
import ExpenceCategoryModel from "../../../models/ExpenceCategory.models";

export default async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        if (req.method === "POST") {
            connectDB();
            try {
                await ExpenceCategoryModel.create({ ...req.body });
                return res.status(201).json({ message: "Category Added" });
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
        if (req.method === "GET") {
            connectDB();
            try {
                if (req.query.id) {
                    const category = await ExpenceCategoryModel.findById(req.query.id)
                    return res.status(200).json(category);
                } else {
                    const category = await ExpenceCategoryModel.find({});
                    return res.status(200).json(category);
                }
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
        if (req.method === "PUT") {
            connectDB();
            try {
                await ExpenceCategoryModel.findByIdAndUpdate(req.query.id, req.body)
                return res.status(201).json({ message: "Category Updated" });
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
        if (req.method === "DELETE") {
            connectDB();
            try {
                await ExpenceCategoryModel.findByIdAndDelete(req.query.id)
                return res.status(201).json({ message: "Category Deleted" });
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
    } else {
        res.status(400).json({ message: "Not Authorized" });
    }
};
