const connection = require('../db/connection')
const {DataTypes} = require('sequelize')

const Missions = connection.define('Misiones',{
  idMision: {
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
  },
  Fecha: {
    type: DataTypes.DATE
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{
  // I don't want createdAt and updatedAt
  createdAt: false,

updatedAt: false,
})

module.exports = Missions