const Product = require("../../../model/productModel")

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