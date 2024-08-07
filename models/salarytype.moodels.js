import mongoose from "mongoose";

const salarytypeSchema = new mongoose.Schema({
    salarytype: {
        type: String
    },
    benefittype: {
        type: String
    }
})
export default mongoose.models.Salarytype || mongoose.model("Salarytype", salarytypeSchema);