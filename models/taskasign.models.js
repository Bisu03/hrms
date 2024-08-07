import mongoose from "mongoose";
import { type } from "os";

const taskSchema = new mongoose.Schema({
    url: {
        type: String
    },
    message: {
        type: String
    },
    time: {
        type: String
    },
    date: {
        type: String
    },
    taskid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        require: true
    },
}, {
    timestamps: true
})
export default mongoose.models.Taskasign || mongoose.model("Taskasign", taskSchema);