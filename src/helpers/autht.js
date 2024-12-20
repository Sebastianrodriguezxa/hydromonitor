const { request } = require('express');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const { compareSync } = require('bcrypt');

// Modulos creados
const user = require('../models/userModel');


const getJWT = (id) => {
    
    try{
      // Encriptamos el id que recibimos
      const payload = CryptoJS.AES.encrypt(JSON.stringify(id), '1234567890').toString();

      const token = jwt.sign({payload},
        "abcdefghijklmnñopqrstuvwxyz_1",
        {expiresIn:'1 day'}
      );
      return token;

    }catch(e){
        console.log(e);
    }

}

const checkJWT = async(req, res = request, next) => {
    try{
      const token = req.header('Authorization');
      // Verificamos que exista un token.
      if(token === undefined) return res.status(400).json({message : 'Por favor inicie sesion.'});
        
      // Extraemos el id encriptado del token y verificamos
      const {payload} = jwt.verify(token, 'abcdefghijklmnñopqrstuvwxyz_1');

      // desencriptamos el id
      const idcryp = CryptoJS.AES.decrypt(payload,'1234567890');
      const id = idcryp.toString(CryptoJS.enc.Utf8);

      // Verificamos si existe la persona en la base de datos.
      const userGettered = await user.findOne({_id: id});
      if(!userGettered){
        return res.status(400).json({message : 'No se encontro el usuario.'});
      }
        
        // Guardamos el usuario en la respuesta.
      req.usuario = userGettered;
      next();
    }catch(e){
        return res.status(400).json({message : 'Error validando token.'});
    }
}

module.exports = {
    getJWT,
    checkJWT
}