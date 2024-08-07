import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({

    profile: {
        type: String,
        default: "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
    },
    employee_id: {
        type: String,
        required: true,
    },
    depobj_id: {
        type: String,
    },
    empobj_id: {
        type: String
    },
    employee_name: {
        type: String,
        required: true,
    },
    employee_email: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    permission: {
        type: Array
    },
    role: {
        type: String,
    },
}, {
    timestamps: true
});

export default mongoose.models.UserEntry || mongoose.model("UserEntry", userSchema)