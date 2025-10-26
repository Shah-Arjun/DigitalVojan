const Order = require('../../../model/orderModel')
const Product = require('../../../model/productModel')

// CREATE ORDER/CHECKOUT controller
exports.createOrder = async (req, res) => {
    const userId = req.user.id
    const {shippingAddress, items, totalAmount, paymentDetails} = req.body
    if(!shippingAddress || !items.length > 0 || !totalAmount || !paymentDetails){
        return res.status(400).json({
            message: "Please provide shippingAddress, items, totalAmount, paymentDetails"
        })
    }

    //insert into order db table
    await Order.create({
        user: userId,
        shippingAddress,
        items,
        totalAmount,
        paymentDetails
    })
    res.status(200).json({
        message: "Order created successfully"
    })
}



// GET MY ORDERS controller
exports.getMyOrders = async (req, res) => {
    const userId = req.user.id
    const orders = await Order.find({user : userId}).populate({           // returns array of objects
        path: 'items.product',
        model: 'Product',
        select: "-productStockQty -createdAt -updatedAt -reviews -__v"   //don't fetch these fields of porduct
    }).select('-__v')    //don't fetch __v form order field
    if(orders.length == 0){
        return res.status(404).json({
            message: "No order found",
            data : []
        })
    }
    res.status(200).json({
        message: "Orders fetched successfully",
        data: orders
    })
} 