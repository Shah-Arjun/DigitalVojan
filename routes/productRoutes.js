const { createProduct, getProducts } = require('../controllers/admin/product/productController')
const isAuthenticated = require('../middleware/isAuthenticated')
const restrictTo = require('../middleware/restrictTo')
const {multer, storage} = require('../middleware/multerConfig')     // multer middleware imports


const router = require('express').Router()
const upload = multer({storage : storage})


// product routes endpoints goes here
router.route('/products')
    .post(isAuthenticated, restrictTo("admin"),upload.single('productImage'), createProduct)  //"productImage" should be same in frontend name field
    .get(getProducts)


module.exports = router