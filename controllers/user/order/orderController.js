const Order = require('../../../model/orderModel')
const Product = require('../../../model/productModel')
const User = require('../../../model/userModel')

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




// UPDATE MY ORDER controller ---> user can update only if the porductStatus is 'pending'
exports.updateMyOrder = async (req, res) => {
    const userId = req.user.id
    const {id} = req.params.id
    const {shippingAddress, items} =req.body
    if(!shippingAddress || items.length == 0){
        return res.status(400).json({
            message: "Please provide shippingAddress, items"
        })
    }
    // get the order of above id from db
    const existingOrder = await Order.findById(id)
    if(!existingOrder){
        return res.status(404).json({
            message: "No order found with that id"
        })
    }
    // check if the user trying to update order is true ordered user
    if(existingOrder.user !== userId){
        return res.status(403).json({
            message: "You don't have permission to update this order"
        })
    }
    //check the orderStatus
    if(existingOrder.orderStatus == "preparation" && existingOrder.orderStatus == "ontheway"){
        return res.status(400).json({
            message: "You cannot update order when it is on the way"
        })
    }

    //update the order
    const updatedOrder = await Order.findByIdAndUpdate(id, {shippingAddress,items},{
        runValidators: true,
        new: true
    })
    res.status(200).json({
        message: "Order updated successfully",
        data: updatedOrder
    })
}





//DELETE MY ORDER controller
exports.deleteMyOrder = async (req, res) => {
    const {id} = req.params.id
    const userId = req.user.id
    //check if the order exist
    const existingOrder = await Order.findById(id)
    if(!existingOrder){
        return res.status(404).json({
            message: "Order doesnot exist with that order id"
        })
    } 
    // check if the user trying to delete order is true ordered user
    if(existingOrder.user !== userId){
        return res.status(403).json({
            message: "You don't have permission to delete this order"
        })
    }

    // delete the order
    await Order.findByIdAndDelete(id)
    res.status(200).json({
        message: "Order deleted successfully",
        data: null
    })
}





//CHANGE MY ORDER STATUS - cancel order controller
exports.cancelOrder = async (req, res) => {
    const {id} = req.params.id
    const userId = req.user.id

    //check if the order exist
    const existingOrder = await Order.findById(id)
    if(!existingOrder){
        return res.status(404).json({
            message: "Order doesnot exist with that order id"
        })
    } 
    // check if the user trying to cancel order is true ordered user
    if(existingOrder.user !== userId){
        return res.status(403).json({
            message: "You don't have permission to cancel of this order"
        })
    }

    //check orderStatus
    if(existingOrder.orderStatus !== "pending"){
        return res.status(400).json({
            message: "You cannot cancelled the order as it is not pending"
        })
    }

    // change the status
    const updatedOrder = await Order.findByIdAndUpdate(id, {orderStatus: "cancelled"}, {
        new: true
    })
    res.status(200).json({
        message: "Order cancelled successfully",
        data: updatedOrder
    })
}