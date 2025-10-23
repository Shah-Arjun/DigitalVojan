const { getMyReviews, createProductReview, deleteProductReview } = require('../../controllers/user/review/reviewController')
const isAuthenticated = require('../../middleware/isAuthenticated')
const restrictTo = require('../../middleware/restrictTo')
const catchAsync = require('../../services/catchAsync')

const router = require('express').Router()

router.route('/').get(isAuthenticated, catchAsync(getMyReviews))

router.route('/:id')
    .post(isAuthenticated, restrictTo('user'), catchAsync(createProductReview))
    .delete(isAuthenticated, catchAsync(deleteProductReview))

module.exports = router 