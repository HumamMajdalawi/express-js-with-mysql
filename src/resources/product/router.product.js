const { Router } = require('express')
const ProductControllers = require('./controller.product')
const { validate } = require('./validator.product')

const router = Router()

router
  .route('/')
  .post([validate('createProduct')], ProductControllers.create)
  .get(ProductControllers.findAll)

router
  .route('/:id')
  .put([validate('updateProduct')], ProductControllers.update)
  .delete(ProductControllers.delete)

module.exports = router
