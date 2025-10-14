const Product = require("../../../model/productModel")


// CREATE PRODUCT API LOGIC
exports.createProduct = async (req, res) => {
    try {
        //console.log(req.user)  //user details passed from isAuthenticated middleware
    
        //console.log(req.file)  //product image details

        const file = req.file
        let filePath
        if(!file){        // if file is not sent from frontend, set default image
            filePath = "https://images.pexels.com/photos/3907507/pexels-photo-3907507.jpeg?cs=srgb&dl=pexels-alexazabache-3907507.jpg&fm=jpg"
        } else {            // esle set the image sent from frontend
            filePath = req.file.filename
        }
        
        const {productName, productDescription, productPrice, productStatus, productStockQty} = req.body

        if(!productName || !productDescription || !productPrice || !productStatus || !productStockQty){
            return res.status(400).json({
                message: "Provide product name, description, price, status, StockQuantity"
            })
        }

        // insert into product collection/table
        await Product.create({
            productName: productName,
            productDescription: productDescription,
            productPrice: productPrice,
            productStatus: productStatus,
            productStockQty: productStockQty,
            productImage: filePath,
        })
        
        res.status(200).json({
            message: "Product created successfully"
        })
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong"           
        })
    }
    
}




// GET ALL PRODUCTS API LOGIC
exports.getProducts = async (req, res) => {
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




//GET PRODUCT_BY_ID API LOGIC
exports.getProduct = async (req, res) => {
    const {id} = req.params
    if(!id) {
        return res.status(400).json({
            message: "Please provide product id",
        })
    }

    const product = await Product.find({ _id : id })            //find() returns array of object
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