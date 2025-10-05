const express = require('express')
require('dotenv').config()
const app = express()

//test api
app.use("/", (req,res) => {
    res.json({
        status: 200,
        message: "This is test page"
    })
})



//mongoDB connection function invoke



//Server Listen
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("Server running at port " + PORT)
})