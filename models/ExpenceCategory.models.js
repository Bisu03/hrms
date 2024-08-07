import mongoose from "mongoose";

const expenceSchema = new mongoose.Schema({
    name: {
        type: String
    },
})
export default mongoose.models.ExpenceCategory || mongoose.model("ExpenceCategory", expenceSchema);