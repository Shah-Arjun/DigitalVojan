const express = require('express')
const connectMongoDB = require('./database/database')
const authRoutes = require("./routes/authRoutes")
const productRoutes = require("./routes/productRoutes")

require('dotenv').config()
const app = express()


// middleware
app.use(express.json())         //helps express to understand/parde JSON
app.use(express.urlencoded({extended: true}))     //handles data from from but doesnot handle file, we need multer for file


//telling nodejs to give access to "uploads" folder
app.use(express.static('./uploads'))


//mongoDB connection function invoke
connectMongoDB()



//test api
app.get("/", (req,res) => {
    res.json({
        status: 200,
        message: "This is test page"
    })
})





app.use("", authRoutes)    // middleware for auth routes --->  /register, /login
app.use("/api", productRoutes)    // middleware for product



//Server Listen
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("Server running at port " + PORT)
})