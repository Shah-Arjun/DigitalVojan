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
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema) 