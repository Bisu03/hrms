import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { connectDB } from "../../../../db/ConnectDB";
import EmployeeModel from "../../../../models/employee.models";
import UserModel from "../../../../models/user.models";
import DepartmentModel from "../../../../models/department.models";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    if (req.method === "GET") {
      connectDB();
      try {
        const employee = await EmployeeModel.findById(req.query.slug).populate("department");
        return res.status(201).json(employee);
      } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Something Went Wrong" });
      }
    }

    if (req.method === "PUT") {
      connectDB();
      try {
        await EmployeeModel.findByIdAndUpdate(req.query.slug, req.body);

        const Permission = await DepartmentModel.findById(req.body.department);

        await UserModel.findOneAndUpdate(
          { employee_id: req.body.employee_id },
          {
            employee_name:
              req.body.employee_first_name + " " + req.body.employee_last_name,
            depobj_id: req.body.department,
            permission: Permission?.permission,
            ...req.body,
          }
        );

        return res.status(201).json({ message: "Information Updated" });
      } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Something Went Wrong" });
      }
    }
    if (req.method === "DELETE") {
      connectDB();
      try {
        await EmployeeModel.findByIdAndDelete(req.query.slug);
        await UserModel.findOneAndDelete({ empobj_id: req.query.slug });
        return res.status(200).json({ message: "Information Deleted" });
      } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Something Went Wrong" });
      }
    }
  } else {
    return res.status(200).json({ message: "Not Authorized" });
  }
};
