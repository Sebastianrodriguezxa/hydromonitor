const {
  missionModel,
  sensorModel,
  measurModel
} = require('../models/indexModel')

const createMeasur = async({
  idMission,
  idSensor,
  value,
  node
}) => {
  try{
    
    const measur = await measurModel.create({
      "FechayHora": "", "idMision": idMission, "idSensor": idSensor, "Valor": value, "Nodo": node
    })
    // Opcional
    // const measurAll = await measurModel.bulkCreate(data)
    if(!measur){
      return{
        success: false,
        message: "Error al crear la medicion"
      }
    }

    return{
      success: true,
      message: "Medicion creada"
    }

  }catch(e){
    console.log({createMeasur: e})
  }
}

const getMeasurByIdMission = async(idMision) => {
  try{
    const measur = await measurModel.findAll({
      where: {
        idMision: idMision
      },
      include: [{
        model: sensorModel,
        attributes:['Nombre']
      }]
    })
    if(!measur){
      return{
        success: false,
        message: "No se pudieron cargar la mediciones"
      }
    }

    if(!measur.length){
      return{
        success: false,
        message: "No tiene mediciones"
      }
    }

    return{
      success: true,
      message: "Se han cargado las mediciones correctamente",
      res: JSON.stringify(measur)
    }

  }catch(e){
    console.log({getMeasurByIdMission: e})
  }
}

module.exports = {
  createMeasur,
  getMeasurByIdMission
}