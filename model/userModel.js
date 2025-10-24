const mongoose = require('mongoose')
const Schema = mongoose.Schema


//user table
const userSchema =  new Schema({
    userName: {
        type: String,
        required: [true, "Username must be provided"],
    },
    userEmail: {                       //email column
        type: String,   
        required: [true, "Email must be provided"],
        unique: true,
        lowercase: true
    },
    userPassword: {                    //pw column
        type: String,
        required: [true, "Password must be provided"],
        minlength: 8,
        //select: false
    },
    phoneNumber: {
        type: Number,
        required: [true, "Phone number must be provided"],
        select: false
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer",
        // select: false
    },
    otp: {
        type: Number,
        select: false
    },
    isOtpVerified: {
        type: Boolean,
        default: false,
        select: false
    },
    cart: [{type : Schema.Types.ObjectId, ref: "Product"}]  //to store the id of carted items in array form
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)
module.exports = User