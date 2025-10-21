const { createReview } = require('../controllers/user/userController')
const isAuthenticated = require('../middleware/isAuthenticated')
const catchAsync = require('../services/catchAsync')

const router = require('express').Router()

router.route('/reviews/:id').post(isAuthenticated, catchAsync(createReview))

module.exports = router