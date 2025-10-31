const { initiateKhaltiPayment, verifyPidx } = require('../../controllers/user/payment/paymentController')
const isAutenticated = require('../../middleware/isAuthenticated')
const catchAsync = require('../../services/catchAsync')

const router = require('express').Router()

router.route('/').post(isAutenticated, catchAsync(initiateKhaltiPayment))
router.route('/success').get(catchAsync(verifyPidx))

module.exports = router
