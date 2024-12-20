const connection = require('../db/connection')
const {DataTypes} = require('sequelize')

const Usuarios = connection.define('Usuarios',{
  idUsuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Nombre1: {
    type: DataTypes.STRING(45)
  },
  Nombre2:{
    type: DataTypes.STRING(45)
  },
  Apellido1: {
    type: DataTypes.STRING(45)
  },
  Apellido2: {
    type: DataTypes.STRING(45)
  },
  LoginName:{
    type: DataTypes.STRING(45)
  },
  Password: {
    type: DataTypes.STRING(500)
  },
  idAccess: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

},{
  // I don't want createdAt and updatedAt
  createdAt: false,

updatedAt: false,
})

module.exports = Usuarios