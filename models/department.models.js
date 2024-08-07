import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    name: {
        type: String
    },
    permission: {
        type: Array
    }
})
export default mongoose.models.Department || mongoose.model("Department", departmentSchema);