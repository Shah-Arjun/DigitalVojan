const { getProductReview, deleteProductReview, addProductReview } = require('../controllers/user/userController')
const isAuthenticated = require('../middleware/isAuthenticated')
const catchAsync = require('../services/catchAsync')

const router = require('express').Router()

router.route('/reviews/:id')
    .post(isAuthenticated, catchAsync(addProductReview))
    .get(isAuthenticated, catchAsync(getProductReview))
    .delete(isAuthenticated, catchAsync(deleteProductReview))

module.exports = router 