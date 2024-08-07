import mongoose from "mongoose";

const expenceSchema = new mongoose.Schema({
    desc: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExpenceCategory",
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
export default mongoose.models.Expence || mongoose.model("Expence", expenceSchema);