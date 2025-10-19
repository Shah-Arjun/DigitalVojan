//function to access users by admin

const { getUsers } = require('../controllers/admin/user/userController')
const isAuthenticated = require('../middleware/isAuthenticated')
const restrictTo = require('../middleware/restrictTo')

const router = require('express').Router()

router.route('/users').get(isAuthenticated, restrictTo('admin'), getUsers)

module.exports = router