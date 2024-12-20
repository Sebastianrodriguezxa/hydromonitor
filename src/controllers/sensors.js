const {
  sensorModel, measurModel
} = require('../models/indexModel')

const createSensor = async({
  cod,
  name
}) => {
  try{

    const sensor = await sensorModel.create({
      "Codigo": cod, "Nombre": name
    })

    if(!sensor){
      return{
        success: false,
        message: "Error al crear el sensor"
      }
    }

    return{
      success: true,
      message: "Se ha creado el sensor correctamente"
    }

  }catch(e){
    console.log({createSensor: e})
  }
}

const getSensors = async() => {
  try{

    const sensor = await sensorModel.findAll({})
    if(!sensor){
      return{
        success: false,
        message: "No se pudieron cargar los sensores"
      }
    }

    return{
      success: true,
      message: "Se han cargado los sensores correctamente",
      res: JSON.stringify(sensor)
    }

  }catch(e){
    console.log({getSensors: e})
  }
}


const updateSensor = async(id, update) => {
  try{
    
    const sensor = await sensorModel.findByPk(id, {})
    if(!sensor){
      return{
        success: false,
        message: "No se encontro el sensor"
      }
    }

    const sensorUpdated = await sensorModel.update({
        Estado: update
      },{
      where: {
        idSensor: id
      }
    })

    if(!sensorUpdated){
      return{
        success: false,
        message: "Ocurrio un error al actualizar el sensor"
      }
    }

    return{
      success: true,
      message: "Se ha actualizado el estado del sensor correctamente"
    }

  }catch(e){
    console.log({updateSensor: e})
  }
}

const deleteSensor = async(id) => {
  try{

    const sensorFinded = await sensorModel.findOne({
      where: {
        idSensor: id
      },
      include: [
        {
          model: measurModel
        }
      ]
    })
    
    if(!sensorFinded){
      return{
        success: false,
        message: "No se encontro el sensor"
      }
    }

    if(sensorFinded.Mediciones.length > 0){
      return{
        success: false,
        message: "No se puede eliminar el sensor, tiene mediciones relacionadas"
      }
    }

    const sensor = await sensorModel.destroy({
      where: {
        idSensor: id
      }
    })

    if(!sensor){
      return{
        success: false,
        message: "No se pudo eliminar el sensor"
      }
    }

    return{
      success: true,
      message: "Se ha eliminado el sensor correctamente",
    }

  }catch(e){
    console.log({getSensors: e})
  }
}

module.exports = {
  createSensor,
  getSensors,
  updateSensor,
  deleteSensor
}