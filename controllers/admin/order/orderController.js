const Order = require('../../../model/orderModel')

// GET user ORDERS by admin controller
exports.getAllOrders = async (req, res) => {
    const orders = await Order.find().populate({
        path: 'items.product',
        model: 'Product'
    })
    if(orders.length == 0){
        return res.status(404).json({
            message: "No order found",
            data : []
        })
    }
    res.status(200).json({
        message: "Product fetchend successfully",
        data: orders
    })
} 




// GET SINGLE ORDER controller
exports.getSingleOrder = async (req, res) => {
    const {id} = req.params
    //check if order exist or not
    const order = await Order.findById(id)
    if(!order){
        return res.status(404).json({
            message: "No order found with that order id"
        })
    }
    res.status(200).json({
        message: "Order fetched successfully",
        data: order
    })
}




// CHANGE ORDER STATUS by admin controller
exports.changeOrderStatus = async (req, res) => {
    const {id} = req.params
    const {orderStatus} = req.body
    if(!orderStatus || !['pending', 'delivered', 'cancelled', 'ontheway', 'preparation'].includes(orderStatus.toLowerCase()) ){
       return res.status(400).json({
            message: "orderStatus is invalis or should be provided"
       }) 
    }
    //check if order exist or not
    const order = await Order.findById(id)
    if(!order){
        return res.status(404).json({
            message: "No order found with that order id"
        })
    }
    const updatedOrder = await Order.findByIdAndUpdate(id, {orderStatus},{
        new: true
    })
    res.status(200).json({
        message: "Order status updated successfully",
        data: updatedOrder
    })
}




// DELETE ORDER by admin controller
exports.deleteOrder = async (req, res) => {
    const {id} = req.params
    const userId = req.user.id
    //check if order exist or not
    const order = await Order.findById(id)
    if(!order){
        return res.status(404).json({
            message: "No order found with that order id"
        })
    }
    //delete the order
    await Order.findByIdAndDelete(id)
    res.status(200).json({
        message: "Order deleted successfully",
        data: null
    })
}