const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    items: [{
        productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
        quantity: {type: Number, required: true}
    }],
    totalAmount: {type: Number, required: true},
    shippingAddress: {type: Number, required: true},
    orderStatus: {
        type: String,
        enum: ['pending', 'delivered', 'cancelled', 'ontheway', 'preparation'],
        default: 'pending'
    },
    paymentDetails: {
        method: {type: String, enum: ['COD', 'khalti']},
        status: {type: String, enum: ['success', 'failed', 'pending']}
    }
},{
    timestamps: true
})



const Order = mongoose.model("Order", orderSchema)
module.exports = Order