import mongoose from "mongoose";

const qrSchema = new mongoose.Schema({
    qr_code: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QRlist"
    },
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    check_in: {
        type: String
    },
    check_out: {
        type: String
    },
    date: {
        type: String
    },
    devicename: {
        type: String
    },
    isPresent: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})
export default mongoose.models.QRAttendenece || mongoose.model("QRAttendenece", qrSchema);