const bcrypt = require('bcrypt')

module.exports = (sequelize, SQL) => {
  const users = sequelize.define(
    'user',
    {
      id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: SQL.STRING,
        allowNull: false,
        unique: true,
      },
      token: SQL.STRING,
      username: SQL.STRING,
      password: {
        type: SQL.STRING,
        allowNull: false,
      },
      phone: {
        type: SQL.STRING,
        allowNull: false,
        unique: true,
      },
      country: SQL.STRING,
      city: SQL.STRING,
    },
    { timestamps: true }
  )

  return users
}
