const { default: axios } = require("axios")
const Order = require("../../../model/orderModel")

exports.initiateKhaltiPayment = async (req, res) => {
    const {orderId, amount} = req.body   //amount from frontend is in paisa
    if(!orderId || !amount){
        return res.status(400).json({
            message: "Please provide orderId, amount"
        })
    }
    const data = {
        return_url : "http://localhost:3000/api/payment/success",
        purchase_order_id : orderId,
        amount : amount,
        website_url : "http://localhost:3000/",
        purchase_order_name : "orderName" + orderId
    }
    const response = await axios.post("https://dev.khalti.com/api/v2/epayment/initiate/", data, {
        headers : {
            'Authorization' : 'key 20576b53735746e380d53950f8ae578b' //live secret key
        }
    })

    console.log(response.data)
    const order = await Order.findById(orderId)
    order.paymentDetails.pidx = response.data.pidx
    await order.save()
    res.redirect(response.data.payment_url)
}



// Verify payment transition controller
exports.verifyPidx = async (req,res) => {
    const pidx = req.query.pidx 
    const response = await axios.post("https://dev.khalti.com/api/v2/epayment/lookup/", {pidx}, {
        headers : {
            'Authorization' : 'key 20576b53735746e380d53950f8ae578b' //live secret key
        }
    })
    if(response.data.status == 'Completed'){
        //update in database
        let order = await Order.find({ 'paymentDetails.pidx' : pidx})
        console.log(order)
        order[0].paymentDetails.method = 'khalti'
        order[0].paymentDetails.status = "paid"
        await order[0].save()
        // notify to forntend 
        res.redirect("http://localhost:3000/") 
    } else {
        // notiyf erroer to frontend
        res.redirect('https://dev.khalti.com/errorPage')
    }
    res.send(response.data)
    
}