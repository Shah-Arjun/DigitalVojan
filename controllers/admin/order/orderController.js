const Order = require('../../../model/orderModel')

// GET user ORDERS by admin controller
exports.getAllOrders = async (req, res) => {
    const orders = await Order.find().populate({
        path: 'items.product',
        model: 'Product'
    })
    if(orders.length == 0){
        return res.status(404).json({
            message: "No order found"
        })
    }
    res.status(200).json({
        message: "Product fetchend successfully",
        data: orders
    })
} 