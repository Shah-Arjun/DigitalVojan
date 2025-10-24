const { addToCart } = require('../../controllers/cartController')
const isAuthenticated = require('../../middleware/isAuthenticated')
const catchAsync = require('../../services/catchAsync')

const router = require('express').Router()

router.route('/:productId').post(isAuthenticated, catchAsync(addToCart))

module.exports = router