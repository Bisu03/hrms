import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    name: {
        type: String
    },
    permission: {
        type: Array
    },
    parentDepartments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department', default: [] }],
})
export default mongoose.models.Department || mongoose.model("Department", departmentSchema);