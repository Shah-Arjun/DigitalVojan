const express = require('express')
const connectMongoDB = require('./database/database')
//routes import
const authRoutes = require("./routes/auth/authRoutes")
const productRoutes = require("./routes/admin/productRoutes")
const adminUsersRoutes = require('./routes/admin/adminUsersRoutes')
const userReviewRoute = require('./routes/user/userReviewRoute')
const profileRoutes = require('./routes/user/profileRoute')
const cartRoutes = require('./routes/user/cartRoutes')
const orderRoute = require('./routes/user/orderRoute')

require('dotenv').config()
const app = express()


// middleware
app.use(express.json())         //helps express to understand/parse JSON
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





app.use("/api/auth", authRoutes)    // middleware for auth routes --->  /register, /login
app.use("/api/products", productRoutes)    // middleware for product
app.use("/api/admin", adminUsersRoutes)
app.use("/api/reviews", userReviewRoute)
app.use("/api/profile", profileRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoute)



//Server Listen
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("Server running at port " + PORT)
})