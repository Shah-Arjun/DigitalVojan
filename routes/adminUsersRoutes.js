//route to access, delete users by admin

const { getUsers, deleteUser } = require('../controllers/admin/user/userController')
const isAuthenticated = require('../middleware/isAuthenticated')
const restrictTo = require('../middleware/restrictTo')
const catchAsync = require('../services/catchAsync')

const router = require('express').Router()

router.route('/users').get(isAuthenticated, restrictTo('admin'), catchAsync(getUsers))  //get users

router.route("/users/:id").delete(isAuthenticated, restrictTo('admin'), catchAsync(deleteUser))  //delete user

module.exports = router