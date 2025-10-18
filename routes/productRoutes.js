const { createProduct, getProducts, getProduct, deleteProduct, editProduct } = require('../controllers/admin/product/productController')
const isAuthenticated = require('../middleware/isAuthenticated')
const restrictTo = require('../middleware/restrictTo')
const {multer, storage} = require('../middleware/multerConfig')     // multer middleware imports
const catchAsync = require('../services/catchAsync')


const router = require('express').Router()
const upload = multer({storage : storage})


// product routes endpoints goes here
router.route('/products')
    .post(isAuthenticated, restrictTo("admin"), upload.single('productImage'), catchAsync(createProduct))  //"productImage" should be same in frontend name field
    .get(catchAsync(getProducts))

router.route("/products/:id")
    .get(catchAsync(getProduct))
    .delete(isAuthenticated, restrictTo("admin"), catchAsync(deleteProduct))
    .patch(isAuthenticated, restrictTo("admin"), upload.single('productImage'), catchAsync(editProduct))


module.exports = router