import mongoose from "mongoose";

const razorpaySchema = new mongoose.Schema({
    id: {
        type: String,
        default: "razorpaycrediential"

    },
    key_id: {
        type: String
    },
    secret_id: {
        type: String
    },
    account_number: {
        type: String
    },
}, {
    timestamps: true
})
export default mongoose.models.Razorpay || mongoose.model("Razorpay", razorpaySchema);