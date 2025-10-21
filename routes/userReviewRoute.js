const { createProductReview, getProductReview } = require('../controllers/user/userController')
const isAuthenticated = require('../middleware/isAuthenticated')
const catchAsync = require('../services/catchAsync')

const router = require('express').Router()

router.route('/reviews/:id').post(isAuthenticated, catchAsync(createProductReview)).get(isAuthenticated, getProductReview)

module.exports = router