const connection = require('../db/connection')
const {DataTypes} = require('sequelize')

const Sensor = connection.define('Sensores',{
  idSensor: {
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
  Estado: {
    type: DataTypes.STRING(45),
    defaultValue: "Inactivo"
  }
},{
  // I don't want createdAt and updatedAt
  createdAt: false,

updatedAt: false,
})

module.exports = Sensor