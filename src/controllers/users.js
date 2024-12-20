const {
  userModel,
  accessLevelModel
} = require('../models/indexModel');
const bcrypt = require('bcrypt');

const {getJWT} = require('../helpers/auth')

const createUser = async({
  loginName,
  password,
  idAccessLevel
}) => {

  try{

    const hasPassword = await bcrypt.hash(password, 10);
    
    const user = await userModel.create({
      "LoginName": loginName, "Password": hasPassword, "idAccess": idAccessLevel
    })

    if(!user){
      return{
        success: false,
        message: "Error al crear el usuario"
      }
    }

    return{
      success: true,
      message: "El usuario se ha creado con exito"
    }

  }catch(e){
    console.log({createUser: e})
  }
}

const getUsers = async() => {
  try{
    const user = await userModel.findAll({
      attributes: ["idUsuario","Nombre1", "Nombre2", "LoginName"],
      // Obtener datos de las tablas relacionadas userModel
      include: [
        {
          model: accessLevelModel
        }
      ]
    })

    if(!user){
      return{
        success: false,
        message: "Error al cargar los usuarios"
      }
    }

    return{
      success: true,
      message: "Se han cargado los usuarios",
      res: JSON.stringify(user)
    }

  }catch(e){
    console.log({getUsers: e})
  }
}

const getUserById = async(id) => {
  try{
    const user = await userModel.findByPk(id, {
      // Obtener datos de las tablas relacionadas userModel
      include: [
        {
          model: accessLevelModel,
          attributes: ["Nombre"]
        }
      ],
      attributes: ["Nombre1", "Nombre2","Apellido1","Apellido2","LoginName"]
    })

    if(!user){
      return{
        success: false,
        message: "Error al cargar el usuario"
      }
    }

    return{
      success: true,
      message: "Se ha cargado el usuario",
      res: JSON.stringify(user)
    }

  }catch(e){
    console.log({getUserById: e})
  }
}

const updateUser = async(id, {name1, name2, lastName1, lastName2, loginName, password}) => {
  try{
    
    const user = await userModel.findByPk(id, {})
    if(!user){
      return{
        success: false,
        message: "No se encontro el usuario"
      }
    }

    const hashPassword = await bcrypt.hash(password, 10);
    if(!hashPassword){
      return{
        success: false,
        message: "No se pudo encriptar la contraseña"
      }
    }

    const userUpdated = await userModel.update({
        "Nombre1": name1, "Nombre2": name2, "Apellido1": lastName1, "Apellido2": lastName2, "LoginName": loginName, "Password": hashPassword
      },{
      where: {
        idUsuario: id
      }
    })

    if(!userUpdated){
      return{
        success: false,
        message: "Ocurrio un error al actualizar el usuario"
      }
    }

    return{
      success: true,
      message: "Se ha actualizado el usuario correctamente"
    }

  }catch(e){
    console.log({updateUser: e})
  }
}

const updateUserAccess = async(isAdmin, id, update) => {
  try{
    
    const user = await userModel.findByPk(id, {
      include: [
        {
          model: accessLevelModel,
          attributes: ["Nombre"]
        }
      ]
    })
    if(!user){
      return{
        success: false,
        message: "No se encontro el usuario"
      }
    }

    if(isAdmin && user.AccessLevel.Nombre === "Admin"){
      return{
        success: false,
        message: "No puede actualizar a este usuario con rol administrador"
      }
    }

    const userUpdated = await userModel.update({
        idAccess: update
      },{
      where: {
        idUsuario: id
      }
    })

    if(!userUpdated){
      return{
        success: false,
        message: "Ocurrio un error al actualizar el usuario"
      }
    }

    return{
      success: true,
      message: "Se ha actualizado el usuario correctamente"
    }

  }catch(e){
    console.log({updateUser: e})
  }
}

const deleteUser = async(isAdmin, id) => {
  try{

    const user = await userModel.findByPk(id, {
      include: [
        {
          model: accessLevelModel,
          attributes: ["Nombre"]
        }
      ]
    })
    if(!user){
      return{
        success: false,
        message: "No se encontro el usuario"
      }
    }

    if(isAdmin && user.AccessLevel.Nombre === "Admin"){
      return{
        success: false,
        message: "No puede eliminar a este usuario con rol administrador"
      }
    }

    const userDeleted = await userModel.destroy({
      where: {
        idUsuario: id
      }
    })

    if(!userDeleted){
      return{
        success: false,
        message: "Ocurrio un error al eliminar el usuario"
      }
    }

    return{
      success: true,
      message: "Se ha eliminado el usuario correctamente"
    }
    
  }catch (e){
    console.log({deleteUser: e})
  }
}

const login = async({
  userName,
  password
}) => {

  try{
    const user = await userModel.findOne({
      where: {
        LoginName: userName
      },
      include: [
        {
          model: accessLevelModel,
          attributes: ["Nombre"]
        }
      ],
      attributes: ["idUsuario","LoginName","Password"]
    })
    if(!user){
      return{
        success: false,
        message: "Usuario y/o contraseña incorrecta"
      }
    }

    const hasPassword = await bcrypt.compare(password, user.Password)
    if(!hasPassword){
      return{
        success: false,
        message: 'Usuario y/o contraseña incorrecta'
      }
    }

    // Eliminamos la contraseña del objeto usuario
    delete user.Password
    const token = getJWT(user.idUsuario)

    return{
      success: true,
      message: "Ha iniciado sesion correctamente",
      token,
      res: JSON.stringify(user)
    }

  }catch(e){
    console.log({login: e})
  }
}


module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  updateUserAccess,
  deleteUser,
  login
}