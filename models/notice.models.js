import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
    title: {
        type: String
    },
    url: {
        type: String
    },
    date: {
        type: String
    }
})
export default mongoose.models.Notice || mongoose.model("Notice", noticeSchema);