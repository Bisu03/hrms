import mongoose from "mongoose";
const { Schema } = mongoose;

const employeeSchema = new Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        require: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        require: true
    },
    salary_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Generatesalary",
        require: true
    },
    profile: {
        type: String,
    },
    employee_id: {
        type: String,
        required: true,
    },
    employee_first_name: {
        type: String,
        required: true,
    },
    employee_last_name: {
        type: String,
        required: true,
    },
    employee_email: {
        type: String,
        required: true,
    },
    contact_id: {
        type: String,
    },
    fund_id: {
        type: String,
    },
    payout_id: {
        type: String,
    },
    salarytype: {
        type: Object
    },
    salary_mnth: {
        type: String,
    },
    salary_year: {
        type: String,
    },
    salary_date: {
        type: String,
    },
    isDisbursed: {
        type: Boolean,
    },
}, {
    timestamps: true
});

export default mongoose.models.Salarysetup || mongoose.model("Salarysetup", employeeSchema)