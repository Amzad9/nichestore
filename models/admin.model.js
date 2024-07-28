import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    avatar: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
       type: String,
       required: true
    },
    contact: {
        type: String,
        required: true,
        unique: true
    },
},{ timestamps: true })

const admin = mongoose.model("admin", adminSchema)
export default admin