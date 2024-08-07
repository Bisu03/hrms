import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { connectDB } from "../../../../db/ConnectDB";
import EmployeeModel from "../../../../models/employee.models";
import UserModel from "../../../../models/user.models";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
        if (req.method === "PUT") {
            connectDB();
            try {
                await EmployeeModel.findByIdAndUpdate(req.query.slug, {
                    $push: {
                        document: { ...req.body },
                    },
                })

                return res
                    .status(201)
                    .json({ message: "Information Updated" });
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
        if (req.method === "DELETE") {
            connectDB();
            try {
                await EmployeeModel.findByIdAndUpdate(req.query.slug, { $pull: { document: { id: req.query.id } } })

                return res.status(201).json({ message: "File Removed" });
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
    } else {
        return res.status(200).json({ message: "Not Authorized" });
    }
};
