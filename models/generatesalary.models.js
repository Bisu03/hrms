import mongoose from "mongoose";
const { Schema } = mongoose;

const employeeSchema = new Schema({
    salary_mnth: {
        type: String,
    },
    salary_year: {
        type: String,
    },
    salary_date: {
        type: String,
    },
}, {
    timestamps: true
});

export default mongoose.models.Generatesalary || mongoose.model("Generatesalary", employeeSchema)