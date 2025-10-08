const express = require('express')
const connectMongoDB = require('./database/database')
const { registerUser, loginUser } = require('./controller/auth/authController')



require('dotenv').config()
const app = express()


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


//register user api
app.post("/register", registerUser)


// Login user api
app.post("/login", loginUser)



//Server Listen
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("Server running at port " + PORT)
})