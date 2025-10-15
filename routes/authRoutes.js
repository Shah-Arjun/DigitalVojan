const { registerUser, loginUser, forgetPassword, verifyOtp, resetPassword } = require('../controllers/auth/authController')
const catchAsync = require('../services/catchAsync')


//advance wy of maintaining routes
const router = require('express').Router()

//routes endpoints goes here
router.route("/register").post(catchAsync(registerUser))     // when '/register' is hitted , registerUser post method invoked
router.route("/login").post(catchAsync(loginUser))     // when '/login' is hitted , loginUser post method invoked
router.route("/forgetPassword").post(catchAsync(forgetPassword))     // when '/forgetPassword' is hitted , forgetPassword post method invoked
router.route("/verifyOtp").post(catchAsync(verifyOtp))
router.route("/resetPassword").post(catchAsync(resetPassword))


module.exports = router