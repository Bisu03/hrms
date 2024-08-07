import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
    name: {
        type: String
    },
})
export default mongoose.models.IncomeCategory || mongoose.model("IncomeCategory", incomeSchema);