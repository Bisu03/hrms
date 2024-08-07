import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    assignby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        require: true
    },
    assignto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        require: true
    },
    date: {
        type: String
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})
export default mongoose.models.Task || mongoose.model("Task", taskSchema);