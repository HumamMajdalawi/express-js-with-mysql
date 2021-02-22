require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const db = require('./models')
const UserRouter = require('./resources/user/router.user')
const ProductRouter = require('./resources/product/router.product')
const CategoryRouter = require('./resources/category/router.category')
const { protect } = require('./resources/user/controller.user')

const app = express()

app.use('/uploads', express.static('./uploads'))
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/user', UserRouter)
app.use('/api/category', CategoryRouter)
app.use(protect)
app.use('/api/product', ProductRouter)

// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and re-sync db.')
// })

app.listen(3000, () => {
  console.log(`REST API on http://localhost:3000/api`)
})
