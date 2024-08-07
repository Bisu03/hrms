import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";

import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "../../../db/ConnectDB";
import QrAttendenceModel from "../../../models/qrattendence.models"

export default async (req, res) => {
    const session = await getServerSession(req, res, authOptions);
    if (session) {
        if (req.method === "POST") {
            connectDB();
            const {
                qr_code,
                employee_id,
                check_in,
                check_out,
                date,
                devicename,
            } = req.body;

            let qrdata;

            const data = await QrAttendenceModel.findOne({ qr_code: qr_code, employee_id: employee_id });
     
            if (data && data.isPresent) {
                qrdata = await QrAttendenceModel.findByIdAndUpdate(
                    data._id, // Use the ID of the document found
                    { check_out: check_out }, // Update the check_out field
                    { new: true } // Return the updated document
                );
            } else {
                qrdata = await QrAttendenceModel.create({
                    qr_code,
                    employee_id,
                    check_in,
                    date,
                    devicename,
                    isPresent: true
                });
            }
            return res.status(200).json(qrdata);
        }
        if (req.method === "GET") {
            connectDB();
            const data = await QrModel.find({ date: req.query.date })
            return res.status(200).json(data);
        }

    } else {
        res.status(400).json({ message: "Not Authorized" });
    }

};
