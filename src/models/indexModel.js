const userModel = require('../models/userModel')
const accessLevelModel = require('../models/accessLevelModel')
const missionModel = require('../models/missionModel')
const measurModel = require('../models/measurModel')
const sensorModel = require('../models/sensorModel')


accessLevelModel.hasMany(userModel, {foreignKey:'idAccess'})
userModel.belongsTo(accessLevelModel, {foreignKey: 'idAccess'})

userModel.hasMany(missionModel, {foreignKey: 'idUsuario'})
missionModel.belongsTo(userModel, {foreignKey: 'idUsuario'})

missionModel.hasMany(measurModel, {foreignKey: 'idMision'})
measurModel.belongsTo(missionModel, {foreignKey: 'idMision'})

sensorModel.hasMany(measurModel, {foreignKey: 'idSensor'})
measurModel.belongsTo(sensorModel, {foreignKey: 'idSensor'})

module.exports = {
  userModel,
  accessLevelModel,
  missionModel,
  measurModel,
  sensorModel
}

