const User = require('../../model/userModel')
const bcrypt = require('bcrypt')  //for hashing
const jwt = require("jsonwebtoken")   //for token generation
const sendEmail = require('../../services/sendEmail')


// Register user api logic
exports.registerUser = async(req, res) => {
    const {email, password, phoneNumber, username} = req.body
    if(!email || !password || !phoneNumber || !username){
        return res.status(400).json({
            message: "Username, email, password, phoneNumber must bed provided"
        })
    }

    //checks if the user with this email already exist ?
    const userFound = await User.find({ userEmail : email })    // email column === req email
    if(userFound.length > 0) {
        return res.status(400).json({
            message: "User with this email already exists."
        })
    }

    //else create new user row in User table with user details
    await User.create({
        userName: username,                //db column name: frontend req
        userEmail: email,                 // db column name: frontend req
        phoneNumber: phoneNumber,
        userPassword: bcrypt.hashSync(password, 10)
    })

    res.status(201).json({
        message: "User created successfully"
    })
}




// Login user api logic
exports.loginUser = async(req, res) => {
    const {email, password} =req.body
    if(!email || !password){
        return res.status(400).json({
            message: "Please enter email and passwords"
        })
    }

    //check if the user exist or not?
    const userFound = await User.find({ userEmail : email })
    if(userFound.length == 0) {
        return res.status(404).json({
            message: "User not registered"
        })
    }

    //match/check the password
    const ismatched = bcrypt.compareSync(password, userFound[0].userPassword)   // (req pw , DB pw)
    if(ismatched) {
        // generate token - unique identifier
        const token = jwt.sign({id: userFound[0]._id}, process.env.SECRET_KEY, {
            expiresIn: '30d'
        })
        res.status(200).json({
            message: "User logged in successfully",
            token
        })
    } else {
        res.status(404).json({
            message: "Invalid Password"
        })
    }
}



// forget password
exports.forgetPassword = async(req, res) => {
    const {email} = req.body     //forntend should send email

    //if email not provided
    if(!email) {
        return res.status(400).json({
            message: "Please enter an email"
        })
    }

    //else provided then checks if it is registered
    const userExist = await User.find({ userEmail: email})    //this returns an array
    if(userExist.length == 0){
        return res.status(404).json({
            message: "Email is not registered."
        })
    }

    //if user exist the send OTP to that email
    const r_no = Math.random()  //gives decimal in range 0 to 1
    const fourDigit = r_no * 10000  //converts into 4 digit 
    const otp = Math.floor(fourDigit)    //converts into integer

                  // OR in 1 line
    // const otp = Math.floor(Math.random() * 10000)

    await sendEmail({
        email: email,
        subject: "OTP for Online Vojan password reset",
        message: `${otp}`
    })

    res.json({
        message: "Email sent successfully"
    })
}