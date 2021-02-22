const config = require('../config/db.config')

module.exports = (sequelize, SQL) => {
  const products = sequelize.define(
    'product',
    {
      id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: SQL.STRING,
        allowNull: false,
      },
      description: {
        type: SQL.TEXT,
        allowNull: false,
      },
      image: {
        type: SQL.TEXT,
        allowNull: false,
        // get() {
        //   const value = this.getDataValue('image').split('\\')[1]
        //   return `${config.HOST}/uploads/` + value
        // },
      },
      price: {
        type: SQL.DOUBLE,
        allowNull: false,
      },
    },
    { timestamps: true }
  )

  return products
}
