import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";
import { authOptions } from "../../auth/[...nextauth]";
import { connectDB } from "../../../../db/ConnectDB";
import UserModel from "../../../../models/user.models";
// import { generateUniqueID } from "../../../utils/UniqueId";
// import { passGenerator } from "../../../utils/PassGenerate";

export default async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (session) {

        if (req.method === "GET") {
            connectDB();
            try {
                const user = await UserModel.findOne({ employee_id: req.query.slug })
                return res.status(200).json(user);
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
        if (req.method === "PUT") {
            connectDB();
            try {
                 await UserModel.findOneAndUpdate({ employee_id: req.query.slug }, { permission: req.body.permission })
                return res.status(200).json({ message: "Information Update" });
            } catch (error) {
                console.error(error);
                return res.status(401).json({ message: "Something Went Wrong" });
            }
        }
    } else {
        res.status(400).json({ message: "Not Authorized" });
    }
};
