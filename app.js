const express = require('express')
const connectMongoDB = require('./database/database')
const authRoutes = require("./routes/authRoutes")

require('dotenv').config()
const app = express()


// middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//mongoDB connection function invoke
connectMongoDB()



//test api
app.get("/", (req,res) => {
    res.json({
        status: 200,
        message: "This is test page"
    })
})





app.use("", authRoutes)    // middleware for routes --->  /register, /login



//Server Listen
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("Server running at port " + PORT)
})