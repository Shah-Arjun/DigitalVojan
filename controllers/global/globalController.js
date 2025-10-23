const Product = require("../../model/productModel")



// GET ALL PRODUCTS API LOGIC  ----> both admin and customer can perform
exports.getProducts = async (req, res) => {
    // const products = await Product.find().populate({    //product model ko reviews vitra ko userId lai populate gar
    //     path: "reviews",
    //     populate: {
    //         path: "userId",
    //         select: "userName userEmail"  //userName, userEmail matra populate gar userId ma
    //     }
    // })

       // or
    // const products = await Product.find().populate("userId").populate("productId")

    const products = await Product.find()
    if(!products){
        res.status(400).json({
            message: "No products found",
            products: []         //helpful in frontend
        })
    } else {
        res.status(200).json({
            message: "Product found",
            products                 //sending products to frontend in response
        })
    }
}




//GET PRODUCT_BY_ID API LOGIC  ----> both admin and customer can perform
exports.getProduct = async (req, res) => {
    const {id} = req.params
    if(!id) {
        return res.status(400).json({
            message: "Please provide product id",
        })
    }

    const product = await Product.find({ _id : id })        //find() returns array of object
    if(product.length == 0){
        res.status(400).json({
            message: "No product found with that id",
            product: []           //helpful in frontend
        })
    } else {
        res.status(200).json({
            message: "Product found with that id",
            product               //sending product to frontend in response
        })
    }
}