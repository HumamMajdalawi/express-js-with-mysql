const { Router } = require('express')
const UserController = require('./controller.user')
const { validate } = require('./validator.user')

const router = Router()

router.route('/signup').post(validate('createUser'), UserController.signup)
router.route('/signin').post(UserController.signin)

module.exports = router
