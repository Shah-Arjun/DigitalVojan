const Product = require("../../../model/productModel")

exports.createProduct = async (req, res) => {
    //console.log(req.user)  //user details passed from isAuthenticated middleware
    
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
        productStockQty: productStockQty
    })
    
    res.status(200).json({
        message: "Product created successfully"
    })
    
}