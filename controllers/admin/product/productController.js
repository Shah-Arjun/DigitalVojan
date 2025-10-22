const Product = require("../../../model/productModel")
const fs = require("fs")  //nodejs package to handle file operation


// CREATE PRODUCT API LOGIC
exports.createProduct = async (req, res) => {
  
        //console.log(req.user)  //user details passed from isAuthenticated middleware
    
        //console.log(req.file)  //product image details

        const file = req.file    //frontend bata aako file , file ma rakh
        let filePath
        if(!file){        // if file is not sent from frontend, set default image
            filePath = "https://images.pexels.com/photos/3907507/pexels-photo-3907507.jpeg?cs=srgb&dl=pexels-alexazabache-3907507.jpg&fm=jpg"
        } else {            // esle set the image sent from frontend
            filePath = req.file.filename
        }
        
        const {productName, productDescription, productPrice, productStatus, productStockQty} = req.body  //destructuring the req sent front frontend

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
            productImage: process.env.BACKEND_URL + filePath,
        })
        
        res.status(200).json({
            message: "Product created successfully"
        })
 
        res.status(500).json({
            message: "Something went wrong"           
        })
    }
    


// GET ALL PRODUCTS API LOGIC
exports.getProducts = async (req, res) => {
    const products = await Product.find().populate({    //product model ko reviews vitra ko userId lai populate gar
        path: "reviews",
        populate: {
            path: "userId",
            select: "userName userEmail"  //userName, userEmail matra populate gar userId ma
        }
    })

       // or
    // const products = await Product.find().populate("userId").populate("productId")

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




//DELETE PRODUCT BY ID API
exports.deleteProduct = async (req, res) => {
    const {id} = req.params
    if(!id) {
        return estimatedDocumentCount.status(400).json({
            message: "Please provide product id"
        })
    }

    const oldData = await Product.findById(id)
    if(!oldData) {
        return res.status(404).json({
            message: "No data found with that id"
        })
    }

    const oldProductImage = oldData.productImage     // http://localhost:3000/1760603785025-wallpaper.png
    const lengthToTrim = process.env.BACKEND_URL.length
    const finalLengthAfterTrim = oldProductImage.slice(lengthToTrim)    // 1760603785025-wallpaper.png

    //remove old file from the uploads folder if new file is sent
      fs.unlink("./uploads/" + finalLengthAfterTrim, (err) => {
        if (err) {
          console.log("Error deleting file", err);
        } else {
          console.log("File/image deleted successfully");
        }
      });

    await Product.findByIdAndDelete(id)
    res.status(200).json({
        message: "Product deleted successfully"
    })
}





//UPDATE PRODUCT API
exports.editProduct = async (req, res) => {
    const {id} = req.params
    // console.log("product --- ", req.body)
    // return
    const {productName, productDescription, productPrice, productStatus, productStockQty} = req.body
    if(!productName || !productDescription || !productPrice || !productStatus || !productStockQty || !id){
        return res.status(400).json({
            message: "Provide product name, description, price, status, StockQuantity, ProductId"
        })
    }

    const oldData = await Product.findById(id)
    if(!oldData) {
        return res.status(404).json({
            message: "No data found with that id"
        })
    }

    const oldProductImage = oldData.productImage     // http://localhost:3000/1760603785025-wallpaper.png
    const lengthToTrim = process.env.BACKEND_URL.length
    const finalLengthAfterTrim = oldProductImage.slice(lengthToTrim)    // 1760603785025-wallpaper.png

    //remove old file from the uploads folder if new file is sent
    if (req.file && req.file.filename) {
      fs.unlink("./uploads/" + finalLengthAfterTrim, (err) => {
        if (err) {
          console.log("Error deleting file", err);
        } else {
          console.log("File/image deleted successfully");
        }
      });
    }
    

    // save the new file after removing old file
    const datas = await Product.findByIdAndUpdate(id, {
        productName: productName,
        productDescription: productDescription,
        productPrice: productPrice,
        productStatus: productStatus,
        productStockQty: productStockQty,
        productImage: req.file && req.file.filename ? process.env.BACKEND_URL + req.file.filename : oldProductImage
    },{
        new: true,    //return new data from db
        runValidators: true       //validate according to ProductModel before save to db
    })

    res.status(200).json({
        message: "Product updated successfully",
        datas
    })
}
