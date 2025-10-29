const { initiateKhaltiPayment } = require('../../controllers/user/payment/paymentController')
const isAutenticated = require('../../middleware/isAuthenticated')
const catchAsync = require('../../services/catchAsync')
const isAutenticated = require('../../services/catchAsync')

const router = require('express').Router()

router.route('/').post(isAutenticated, catchAsync(initiateKhaltiPayment))

module.exports = router
