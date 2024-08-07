import mongoose from "mongoose";
const { Schema } = mongoose;

const employeeSchema = new Schema({
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
    alternate_number: {
        type: String,
    },
    gender: {
        type: String,
    },
    maratial_status: {
        type: String,
    },
    date_birth: {
        type: String,
    },
    address: {
        type: String,
    },
    phonenumber: {
        type: String,
    },
    hiredate: {
        type: String,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        require: true
    },
    aadhar: {
        type: String,
    },
    pan: {
        type: String,
    },
    contact_id: {
        type: String,
    },
    fund_id: {
        type: String,
    },
    salary: {
        type: String,
    },
    bankinfo: {
        type: Object
    },
    salarytype: {
        type: Object
    },
    document: {
        type: Array
    },
    isSalaryAccountCreate: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export default mongoose.models.Employee || mongoose.model("Employee", employeeSchema)