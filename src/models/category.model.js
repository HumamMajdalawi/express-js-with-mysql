const { sequelize } = require('.')

module.exports = (sequelize, SQL) => {
  const categories = sequelize.define(
    'category',
    {
      id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: SQL.STRING,
        allowNull: false,
      },
    },
    { timestamps: true }
  )

  return categories
}
