const { succeed, failed } = require('../../utiles')
const db = require('../../models')
const Category = db.categories

exports.findAll = (req, res) => {
  Category.findAll()
    .then((data) => {
      return succeed(res, data, 200)
    })
    .catch((err) => {
      console.error(err)
      return failed(res)
    })
}
