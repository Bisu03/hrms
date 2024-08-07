import mongoose from "mongoose";
import { type } from "os";

const incomeSchema = new mongoose.Schema({
    desc: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "IncomeCategory",
        require: true
    },
    amount: {
        type: Number
    },
    date: {
        type: String
    }
}, {
    timestamps: true
})
export default mongoose.models.Income || mongoose.model("Income", incomeSchema);