const User = require('../model/userModel')
const Product = require('../model/productModel')

exports.addToCart = async (req, res) => {
    const userId = req.user.id
    const {productId} = req.params
    if(!productId){
        return res.status(400).json({
            message: "Please provide productId"
        })
    }
    const productExist = await Product.findById(productId)
    if(!productExist){
        return res.status(404).json({
            message: "Product with that id doesn't exist"
        })
    }
    const user = await User.findById(userId)
    user.cart.push(productId)   //push the id of that product to cart column
    user.save()
    res.status(200).json({
        message: "Product added to cart"
    })
}