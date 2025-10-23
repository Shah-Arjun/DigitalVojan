const { getMyReviews } = require('../controllers/review/reviewController')
const { getProductReview, deleteProductReview, addProductReview, createProductReview } = require('../controllers/user/userController')
const isAuthenticated = require('../middleware/isAuthenticated')
const catchAsync = require('../services/catchAsync')

const router = require('express').Router()

router.route('/reviews').get(isAuthenticated, catchAsync(getMyReviews))

router.route('/reviews/:id')
    .post(isAuthenticated, catchAsync(createProductReview))
    .delete(isAuthenticated, catchAsync(deleteProductReview))

module.exports = router 