const Review = require("../../model/reviewModel")
const Product = require("../../model/productModel")

//REVIEW product api logic
exports.createReview = async (req, res) => {
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



