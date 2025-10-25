const User = require('../model/userModel')
const Product = require('../model/productModel')


// ADD product to cart controller
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
    await user.save()
    res.status(200).json({
        message: "Product added to cart"
    })
}




// GET all cart items based on user
exports.getMyCartItems = async(req, res) => {
    const userId = req.user.id
    const userData = await User.findById(userId).populate({
        path: "cart",                   // populate the cart column
        select: "-productStatus -__v"         // don't fetch productStatus, __v
    })   
     if(userData.cart.length == 0){
        return res.status(404).json({
            message: "Cart is empty",
            data: []
        })
    }
    res.status(200).json({
        message: "Cart data fetched successfully",
        data: userData.cart
    })
}






// REMOVE items from cart
exports.deleteItemsFromCart = async(req,res) => {
    const {productId} = req.params
    // const {productIds} = req.body
    const userId = req.user.id
    //check if that project exist or not
    const product = await Product.findById(productId)
    if(!product){
        return res.status(200).json({
            message: "No product with that productId"
        })
    }
    // get user cart
    const user = await User.findById(userId)
    user.cart = user.cart.filter(pId => pId != productId)
    // productIds.forEach(productIdd => {                                   //to remove multiple product at a time
    //     user.cart = user.cart.filter(pId => pId != productIdd)
    // });
    await user.save()
    res.status(200).json({
        message: "Item removed from cart",
    })
}