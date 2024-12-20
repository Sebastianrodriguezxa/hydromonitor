const connection = require('../db/connection')
const {DataTypes} = require('sequelize')

const Access = connection.define('AccessLevels',{
  idAccess: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Codigo: {
    type: DataTypes.STRING(45)
  },
  Nombre: {
    type: DataTypes.STRING(45)
  }
},{
  // I don't want createdAt and updatedAt
  createdAt: false,

updatedAt: false,
})

module.exports = Access