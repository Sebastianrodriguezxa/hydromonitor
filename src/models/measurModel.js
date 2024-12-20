const connection = require('../db/connection')
const moment = require('moment')
const {DataTypes} = require('sequelize')

const Measur = connection.define('Mediciones',{
  idMedicion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  FechayHora: {
    type: DataTypes.DATE,
    get(){
      return moment(this.getDataValue('Date')).format("DD/MM/YYYY h:mm:ss a")
    }
  },
  Valor: {
    type: DataTypes.FLOAT
  },
  idMision: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idSensor: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{
  // I don't want createdAt and updatedAt
  createdAt: false,

updatedAt: false,
})

module.exports = Measur
