const { body } = require('express-validator')
const db = require('../../models')
const User = db.users

exports.validate = (method) => {
  switch (method) {
    case 'createUser': {
      return [
        body('email', 'User email is requried').exists(),
        body('email', 'User correct email is requried').isEmail(),
        body('email').custom((value) => {
          return User.findAll({ where: { email: value } }).then((user) => {
            if (user.length > 0) {
              return Promise.reject('E-mail already in use')
            }
          })
        }),
        body('phone', 'User phone is required').exists(),
        body('phone').custom((value) => {
          return User.findAll({ where: { phone: value } }).then((user) => {
            if (user.length > 0) {
              return Promise.reject('phone already in use')
            }
          })
        }),
        body('password', 'User password is required').exists(),
      ]
    }
  }
}
