import mongoose from "mongoose";

const qrSchema = new mongoose.Schema({
    date: {
        type: String
    },
}, {
    timestamps: true
})
export default mongoose.models.QRlist || mongoose.model("QRlist", qrSchema);