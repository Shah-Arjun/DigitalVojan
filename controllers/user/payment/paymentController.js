const { default: axios } = require("axios")

exports.initiateKhaltiPayment = async (req, res) => {
    const {orderId, amount} = req.body   //amount from frontend is in paisa
    if(!orderId || !amount){
        return res.status(400).json({
            message: "Please provide orderId, amount"
        })
    }
    const data = {
        return_url : "http://localhost:3000",
        purchase_order_id : orderId,
        amount : amount,
        website_url : "http://localhost:3000/"
    }
    const response = await axios.post("https://dev.khalti.com/api/v2/epayment/initiate/", data, {
        headers : {
            'Authorization' : 'key 20576b53735746e380d53950f8ae578b' //live secret key
        }
    })

    console.log(response)
}