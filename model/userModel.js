const mongoose = require('mongoose')
const Schema = mongoose.Schema


//user table
const userSchema =  new Schema({
    userEmail: {                       //email column
        type: String,   
        required: [true, "Email must be provided"]
    },
    userPassword: {                    //pw column
        type: String,
        required: [true, "Password must be provided"]
    },
    userName: {
        type: String,
        required: [true, "Username must be provided"]
    },
    phoneNumber: {
        type: Number,
        required: [true, "Phone number must be provided"]
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    },
    otp: {
        type: Number
    },
    isOtpVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)
module.exports = User