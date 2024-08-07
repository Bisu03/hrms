import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { connectDB } from "../../../../db/ConnectDB";
import DepartmentModel from "../../../../models/department.models";

export default async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        if (req.method === "GET") {
            connectDB();
            try {
                const department = await DepartmentModel.findById(req.query.slug)
                return res.status(200).json(department);
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
        if (req.method === "PUT") {
            connectDB();
            try {
                console.log("req");
                await DepartmentModel.findByIdAndUpdate(req.query.slug, { ...req.body })
                return res.status(201).json({ message: "Permission Updated" });
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
    } else {
        return res.status(400).json({ message: "Not Authorized" });
    }
};
