const { createProduct } = require('../controllers/admin/product/productController')
const isAuthenticated = require('../middleware/isAuthenticated')
const restrictTo = require('../middleware/restrictTo')

const router = require('express').Router()

// product routes endpoints goes here
router.route('/createProduct').post(isAuthenticated, restrictTo("admin"), createProduct)


module.exports = router