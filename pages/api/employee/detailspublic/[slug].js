
import { connectDB } from "../../../../db/ConnectDB";
import EmployeeModel from "../../../../models/employee.models";
import DepartmentModel from "../../../../models/department.models";

export default async (req, res) => {
    if (req.method === "GET") {
        connectDB();
        try {
            const employee = await EmployeeModel.findOne(
                { employee_id: req.query.slug },
                "profile employee_id  employee_first_name employee_last_name employee_email gender maratial_status date_birth address phonenumber department"
            ).populate("department");
            return res.status(201).json(employee);
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: "Something Went Wrong" });
        }
    }
};
