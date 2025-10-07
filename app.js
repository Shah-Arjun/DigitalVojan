const express = require('express')
const connectMongoDB = require('./database/database')
const User = require('./model/userModel')

const bcrypt = require('bcrypt')

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
app.post("/register", async(req, res) => {
    const {email, password, phoneNumber, username} = req.body
    if(!email || !password || !phoneNumber || !username){
        return res.status(400).json({
            message: "Username, email, password, phoneNumber must bed provided"
        })
    }

    //checks if the user with this email already exist ?
    const userFound = await User.find({ email : email })    // email column === req email
    if(userFound.length > 0) {
        return res.status(400).json({
            message: "User with this email already exists."
        })
    }

    //else create new user row in User table with user details
    await User.create({
        userName: username,                //db column name: frontend req
        email: email,                 // db column name: frontend req
        phoneNumber: phoneNumber,
        password: bcrypt.hashSync(password, 10)
    })

    res.status(201).json({
        message: "User created successfully"
    })
})



// Login user api
app.post("/login", async(req, res) => {
    const {email, password} =req.body
    if(!email || !password){
        return res.status(400).json({
            message: "Please enter email and passwords"
        })
    }

    //check if the user exist or not?
    const userFound = await User.find({ email : email })
    if(userFound == 0) {
        return res.status(404).json({
            message: "User not registered"
        })
    }

    //match/check the password
    const ismatched = bcrypt.compareSync(password, userFound[0].password)   // (req pw , DB pw)
    if(ismatched) {
        res.status(200).json({
            message: "User logged in successfully"
        })
    } else {
        res.status(404).json({
            message: "Invalid Password"
        })
    }
})



//Server Listen
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("Server running at port " + PORT)
})