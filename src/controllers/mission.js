const moment = require('moment')

const {
  missionModel,
  measurModel
} = require('../models/indexModel')

const createMission = async({
  cod,
  name,
  idUser
}) => {
  try{

    const dateNow = new moment.utc()

    const mission = await missionModel.create({
      "Codigo": cod, "Nombre": name, "Fecha": dateNow, "idUsuario": idUser
    })

    if(!mission){
      return{
        success: false,
        message: "Error al crear la mision"
      }
    }

    return{
      success: true,
      message: "Se creo la mision correctamente"
    }

  }catch(e){
    console.log({createMission: e})
  }
}

const getMission = async() => {
  try{
    const mission = await missionModel.findAll({
      order: [["idMision", "DESC"]]
    });

    
    // console.log(mission)
    if(!mission){
      return{
        success: false,
        message: "No se pudieron cargar las misiones"
      }
    }

    return{
      success: true,
      message: "Se han cargado las misiones correctamente",
      res: JSON.stringify(mission)
    }

  }catch(e){
    console.log({getMission: e})
  }
}

const deleteMission = async(id) => {
  try{

    const findMeasur = await measurModel.findAll({
      where: {
        idMision: id
      },
      include: [
        {
          model: missionModel
        }
      ]
    })

    if(!findMeasur){
      return{
        success: false,
        message: "No se encontraron mediciones para la mision"
      }
    }

    // console.log(findMeasur)
    if(findMeasur.length > 0){
      return{
        success: false,
        message: "No se puede eliminar la mision, contiene mediciones"
      }
    }


    const mission = await missionModel.destroy({
      where: {
        idMision: id
      }
    })

    if(!mission){
      return{
        success: false,
        message: "No se pudo eliminar la mision"
      }
    }

    return{
      success: true,
      message: "Se ha eliminado la mision correctamente"
    }
  }catch(e){
    console.log({deleteMission: e})
  }
}


module.exports = {
  createMission,
  getMission,
  deleteMission
}