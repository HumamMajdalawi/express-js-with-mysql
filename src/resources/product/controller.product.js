const { succeed, failed, notFound, validation } = require('../../utiles')
const fs = require('fs')
const { validationResult } = require('express-validator')
const db = require('../../models')
const Product = db.products
const Op = db.Sequelize.Op

exports.create = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    validation(res, errors.array())
  }

  const product = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    categoryId: req.body.categoryId,
  }

  product.image = uploadImg(req.body.image)

  Product.create(product)
    .then((data) => succeed(res, data, 201))
    .catch((err) => {
      console.log(err)
      return failed(res)
    })
}

exports.findAll = (req, res) => {
  const conds = { where: {} }
  const title = req.query.title
    ? (conds.where.title = { [Op.like]: `%${req.query.title}%` })
    : null
  const category = req.query.category
    ? (conds.where.categoryId = req.query.category)
    : null

  Product.findAll(conds)
    .then((data) => succeed(res, data, 200))
    .catch((err) => {
      console.log(err)
      return failed(res)
    })
}

exports.update = (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return validation(res, errors.array())
  }

  const id = req.params.id
  const product = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    categoryId: req.body.categoryId,
  }

  product.image = uploadImg(req.body.image)

  Product.update(product, { where: { id: id } })
    .then((num) => {
      let updatedProduct
      if (num == 1) {
        Product.findByPk(id).then((data) => {
          updatedProduct = data.dataValues
          console.log('updatedProduct', updatedProduct)
          return succeed(res, updatedProduct, 201)
        })
      } else {
        return notFound(res)
      }
    })
    .catch((err) => {
      console.log(err)
      return failed(res)
    })
}

exports.delete = (req, res) => {
  const id = req.params.id
  let deletedProduct
  Product.findByPk(id).then((data) => {
    deletedProduct = data.dataValues
    console.log('deletedProduct', deletedProduct)
  })

  Product.destroy({ where: { id } })
    .then((num) => {
      if (num == 1) {
        return succeed(res, deletedProduct, 201)
      } else {
        return notFound(res)
      }
    })
    .catch((err) => {
      console.log(err)
      return failed(res)
    })
}

function uploadImg(image) {
  let fileName = './uploads/' + Date.now() + '.png'
  fs.writeFile(
    fileName,
    image.split(';base64,').pop(),
    { encoding: 'base64' },
    function (err) {
      if (err) console.error(err)
      console.log('File created')
    }
  )
  return fileName
}
