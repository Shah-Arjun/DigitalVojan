const { createProductReview, getProductReview, deleteProductReview } = require('../controllers/user/userController')
const isAuthenticated = require('../middleware/isAuthenticated')
const catchAsync = require('../services/catchAsync')

const router = require('express').Router()

router.route('/reviews/:id')
    .post(isAuthenticated, catchAsync(createProductReview))
    .get(isAuthenticated, catchAsync(getProductReview))
    .delete(isAuthenticated, catchAsync(deleteProductReview))

module.exports = router