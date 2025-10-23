const Review = require("../../model/reviewModel")
const Product = require("../../model/productModel")

//REVIEW product api logic
exports.createProductReview = async (req, res) => {
    const userId = req.user.id
    const {rating, message} = req.body
    const productId = req.params.id

    if(!userId || !productId || !rating || !message){
        return res.status(400).json({
            message: "Please provide userid, rating and message"
        })
    }

    //check if the product exist in db or not
    const productExist = await Product.findById(productId)
    if(!productExist){
        return res. status(404).json({
            message: "Product that id doesnot exist"
        })
    }

    // insert review to db
    await Review.create({
        userId: userId,
        productId: productId,
        rating: rating,
        message: message
    })

    res.status(200).json({
        message: "Review added successfully"
    })
}




// GET PRODUCT REVIEW api logic---------------product ma hunchha 
// exports.getProductReview = async (req, res) => {
//     const productId = req.params.id
    
//     if(!productId){
//         return res.status(400).json({
//             message: "Please provide product id"
//         })
//     }

//     const productExist = await Product.findById(productId)
//     if(!productExist){
//         return res.status(404).json({
//             message: "Product with that id doesnot exist"
//         })
//     }

//     const reviews = await Review.find({productId : productId}).select(["-__v"]).populate("userId")

//     res.status(200).json({
//         message: "Reviews fetched successfylly",
//         data: reviews
//     })
// }




// GET reviews given by me api logic
exports.getMyReviews = async (req,res) => {
    const userId = req.user.id
    const reviews = await Review.findById({userId : userId})
    if(reviews.length == 0){
        res.status(404).json({
            message: "You haven't given review to any product yet",
            reviews: []
        })
    } else {
        res.status(200).json({
            message: "Reviews fetched successfully",
            reviews
        })
    }
}



// DELETE REVIEW api logic
exports.deleteProductReview = async (req, res) => {
    const reviewId = req.params.id
    if(!reviewId){
        return res.status(400).json({
            message: "Please provide reviewId"
        })
    }

    //check if that user created this review
    const userId = req.user.id
    const review = Review.findById(reviewId)
    const ownerOfReview = review.userId
    if(ownerOfReview !== userId){
        return res.status(400).json({
            message: "You don't have permission to delete this review (you are not the owner of this review)"
        })
    }

    // find the review by id in db and delete
    await Review.findByIdAndDelete(reviewId)
    res.status(200).json({
        message: "Review deleted successfully"
    })
}





// add review---for concept of relationship in mongodb
// exports.addProductReview = async (req, res) => {
//     const productId = req.params.id
//     const {rating, message} = req.body
//     const userId = req.user.id
//     const review = {
//         userId,
//         rating,
//         message
//     }
//     const product = await Product.findById(productId)
//     product.reviews.push(review)   // product model ko reviews field ma review hal
//     await product.save()   // save to db
//     res.json({
//         message: "Review done"
//     })
// }
