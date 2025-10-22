// for concept of nested model/ relationship in mongodb

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    userId : {                             
        type : Schema.Types.ObjectId,    
        ref : "User",
        required : [true, "A review must belong to user"]
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


const NextWayReview = mongoose.model("NextWayReview", reviewSchema)
module.exports = {
    NextWayReview,
    reviewSchema 
}