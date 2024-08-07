import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
    reason: {
        type: String
    },
    date: {
        type: String
    },
    numberofleave: {
        type: String
    },
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    isAproved: {
        type: String,
        default: "Pending"
    }
}, {
    timestamps:true
})
export default mongoose.models.Leave || mongoose.model("Leave", leaveSchema);