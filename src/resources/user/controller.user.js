const { succeed, failed, notFound, validation } = require('../../utiles')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('../../config/config')
const bcrypt = require('bcrypt')
const db = require('../../models')
const User = db.users

const newToken = (user) => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp,
  })
}

exports.signup = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return validation(res, errors.array())
  }

  const user = {
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 8),
    username: req.body.username,
    phone: req.body.phone,
    city: req.body.city,
    country: req.body.country,
  }

  User.create(user)
    .then((user) => {
      const token = newToken(user)
      user.token = token
      return succeed(res, { token }, 201)
    })
    .catch((err) => {
      console.log(err)
      return failed(res)
    })
}

exports.signin = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  }

  User.findAll({ where: { email: user.email } })
    .then(async (data) => {
      const userData = data[0]['dataValues']
      if (await checkPassword(user.password, userData.password)) {
        token = newToken(userData)
        return succeed(res, { token }, 200)
      }
    })
    .catch((err) => {
      console.log(err)
      return failed(res)
    })
}

const checkPassword = function (password, passwordHash) {
  console.log(passwordHash)
  return new Promise((resolver, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) return reject(err)
      resolver(same)
    })
  })
}

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

exports.protect = async (req, res, next) => {
  let bearer = req.headers['authorization']
  if (!bearer) {
    return res.status(401).send({
      status: 'failed',
      message: 'Not Authenticated',
      data: [],
      response_code: 401,
    })
  }

  const token = bearer.split(' ')[1]
  let payload
  try {
    payload = await verifyToken(token)
  } catch (e) {
    console.log('error: ' + e)
    return res.status(401).send({
      status: 'failed',
      message: 'Not Authenticated',
      data: [],
      response_code: 401,
    })
  }

  const data = await User.findAll({ where: { id: payload.id } })

  if (!data) {
    return res.status(401).send({
      status: 'failed',
      message: 'Not Authenticated',
      data: [],
      response_code: 401,
    })
  }

  req.user = data[0]['dataValues']
  next()
}
