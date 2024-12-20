const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

const {
  userModel, accessLevelModel
} = require('../models/indexModel')

const getJWT = (id) => {
  try{
    const payload = CryptoJS.AES.encrypt(JSON.stringify(id), "123456789").toString()
    const token = jwt.sign({payload}, 
      "abcdefghijklmnñopqrstuvwxyz123456789",
      {expiresIn: "1 day"}
      )

    return token

  }catch(e){
    console.log({getJWT: e})
  }
}

const checkJWT = async(token) => {
  try{
    if(typeof token === 'undefined'){
      return{
        success: false,
        message: "Por favor inicie sesion"
      }
    }

    const {payload} = jwt.verify(token, "abcdefghijklmnñopqrstuvwxyz123456789")
    const idCryp = CryptoJS.AES.decrypt(payload, "123456789")
    const id = JSON.parse(idCryp.toString(CryptoJS.enc.Utf8))

    const user = await userModel.findByPk(id,{
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
        message: "Usuario almacenado en el token no encontrado no encontrado"
      }
    }

    return {
      success: true,
      user: JSON.stringify(user),
    };

  }catch(e){
    console.log({checkJWT: e})
  }
}

module.exports = {
  getJWT,
  checkJWT
}