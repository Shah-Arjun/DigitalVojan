const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema =  new Schema({
    email: {
        type: String,
        required: [true, "Email must be provided"]
    },
    password: {
        type: String,
        required: [true, "Password must be provided"]
    },
    phoneNumber: {
        type: Number,
        required: [true, "Phone number must be provided"]
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        defaultc: customer
    },
})

module.exports = mongoose.model("User", userSchema) 