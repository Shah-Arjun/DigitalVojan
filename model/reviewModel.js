const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    userId : {                              // acts as foreign key
        type : Schema.Types.ObjectId,      // for user id refrenced to User model, stores user id
        ref : "User",
        required : [true, "A review must belong to user"]
    },
    productId : {                              // acts as foreign key
        type : Schema.Types.ObjectId,      // for product id refrenced to Product model, stores product id
        ref : "Product",
        required : [true, "A review must be of product"]
    },
    rating : {
        type : Number,
        default : 3,
    },
    message : {
        type : String,
        required : true
    }
})


const Review = mongoose.model("Review", reviewSchema)
module.exports = Review