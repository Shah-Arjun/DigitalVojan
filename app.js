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
const adminOrdersRoutes = require('./routes/admin/adminOrderRoute')
const paymentRoute = require('./routes/user/paymentRoute')

const {Server} = require("socket.io")

require('dotenv').config()
const app = express()


//hey server use ejs
app.set("view engine", 'ejs')


// middleware
app.use(express.json())         //helps express to understand/parse JSON
app.use(express.urlencoded({extended: true}))     //handles data from from but doesnot handle file, we need multer for file


//telling nodejs to give access to "uploads" folder
app.use(express.static('./uploads'))


//mongoDB connection function invoke
connectMongoDB()


// api to render home.ejs
app.get('/chat', (req, res) => {
    res.render("home.ejs")
})


//test api
app.get("/", (req,res) => {
    res.json({
        status: 200,
        message: "This is test page"
    })
})




app.use("/api/auth", authRoutes)    // middleware for auth routes --->  /register, /login
app.use("/api/products", productRoutes)    // middleware for product
app.use("/api/admin", adminUsersRoutes)    //adminUser route
app.use("/api/admin", adminOrdersRoutes)     // access to orders by admin
app.use("/api/reviews", userReviewRoute)
app.use("/api/profile", profileRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoute)
app.use("/api/payment", paymentRoute)



//Server Listen  ---for http
const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => {
    console.log("Server running at port " + PORT)
})

// making server listen for websocket too
const io = new Server(server)   // making object 'io' of class 'Server' and passing the 'server' listen code, now it accepts websockets

// const onlineUsers = []  //to know the online users

io.on("connection", (socket) => {
    // onlineUsers.push(socket.id)
    console.log("user connected", socket)
})