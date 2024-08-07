import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { connectDB } from "../../../../db/ConnectDB";
import EmployeeModel from "../../../../models/employee.models";
export default async (req, res) => {
    const session = await getServerSession(req, res, authOptions);
    if (session) {
        if (req.method === "GET") {
            connectDB();
            try {
                const employee = await EmployeeModel.find({ department: req.query.slug })
                return res
                    .status(201)
                    .json(employee);
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
    } else {
        return res.status(400).json({ message: "Not Authorized" });
    }
};
