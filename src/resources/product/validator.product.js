const { body } = require('express-validator')

exports.validate = (method) => {
  switch (method) {
    case 'createProduct': {
      return [
        body('title', 'Product title is requried').exists(),
        body('description', 'Product description is required').exists(),
        body('image', 'Product image is required').exists(),
        body('price', 'Product price is required').exists(),
        body('categoryId', 'Product categoryId is required').exists(),
      ]
    }
    case 'updateProduct': {
      return [
        body('title', 'Product title is requried').exists(),
        body('description', 'Product description is required').exists(),
        body('image', 'Product image is required').exists(),
        body('price', 'Product price is required').exists(),
        body('categoryId', 'Product categoryId is required').exists(),
      ]
    }
  }
}
