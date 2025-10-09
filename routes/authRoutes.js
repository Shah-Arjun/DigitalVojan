const { registerUser, loginUser, forgetPassword, verifyOtp } = require('../controllers/auth/authController')


//advance wy of maintaining routes
const router = require('express').Router()

//routes goes here
router.route("/register").post(registerUser)     // when '/register' is hitted , registerUser post method invoked
router.route("/login").post(loginUser)     // when '/login' is hitted , loginUser post method invoked
router.route("/forgetPassword").post(forgetPassword)     // when '/forgetPassword' is hitted , forgetPassword post method invoked
router.route("/verifyOtp").post(verifyOtp)


module.exports = router