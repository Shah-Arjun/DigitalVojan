const { createProduct } = require('../controllers/admin/product/productController')
const isAuthenticated = require('../middleware/isAuthenticated')

const router = require('express').Router()

// product routes endpoints goes here
router.route('/createProduct').post(isAuthenticated, createProduct)


module.exports = router