const {
  userModel,
  accessLevelModel
} = require('../models/indexModel')

const createAccess = async({
  cod,
  name
}) => {
  try{

    const access = await accessLevelModel.create({
      "Codigo": cod, "Nombre": name
    })

    if(!access){
      return{
        success: false,
        message: "Error al crear el acceso"
      }
    }

    return{
      success: true,
      message: "Acceso creado"
    }

  }catch(e){
    console.log({createAccess: e})
  }
}

const getAccess = async() => {
  try{
    const access = await  accessLevelModel.findAll({})
    if(!access){
      return{
        success: false,
        message: "No se pudieron cargar los accesos"
      }
    }

    return{
      success: true,
      message: "Se han cargado los accesos",
      res: JSON.stringify(access)
    }

  }catch(e){
    console.log({getAccess: e})
  }
}

const getAccessById = async(id) => {
  try{
    const accessUsers = await accessLevelModel.findAll({
      where:{
        idAccess: id
      },
      include: [
        {
          model: userModel,
          attributes: ["Nombre1","Nombre2","Apellido1","Apellido2"]
        }
      ]
    })

    if(!accessUsers){
      return{
        success: false,
        message: "No se pudieron cargar los usuarios por accesos"
      }
    }

    return{
      success: true,
      message: "Se han cargado los usuarios por acceso"
    }
    
  }catch(e){
    console.log({getAccessById: e})
  }
}

const deleteAccess = async(id) => {
  try{

    const findAccess = await accessLevelModel.findOne({
      where:{
        idAccess: id
      },
      include:[
        {
          model: userModel
        }
      ]
    })

    if(findAccess.Usuarios.length > 0){
      return{
        success: false,
        message: "No se puede eliminar el acceso, ya tiene uso de usuarios"
      }
    }

    const access = await accessLevelModel.destroy({
      where: {
        idAccess: id
      }
    })

    if(!access){
      return{
        success: false,
        message: "No se pudo eliminar el acceso"
      }
    }

    return{
      success: true,
      message: "Se ha eliminado el acceso correctamente"
    }

  }catch(e){
    console.log({deleteAccess: e})
  }
}

module.exports = {
  createAccess,
  getAccess,
  getAccessById,
  deleteAccess
}