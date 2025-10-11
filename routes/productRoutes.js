const { createProduct } = require('../controllers/admin/product/productController')

const router = require('express').Router()

// product routes endpoints goes here
router.route('./createProduct').post(createProduct)


module.exports = router