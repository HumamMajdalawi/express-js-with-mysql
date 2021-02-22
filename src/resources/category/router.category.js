const { Router } = require('express')
const CategoryController = require('./controller.category')

const router = Router()

router.route('/').get(CategoryController.findAll)

module.exports = router
