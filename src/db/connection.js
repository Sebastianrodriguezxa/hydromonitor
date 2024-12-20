const {Sequelize} = require('sequelize')

const connection = new Sequelize(
  'mydb', // Base de datos
  'root', // Usuario
  '', // Contraseña
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
  }
)

connection.authenticate()
.then(() => {
  console.log('Conectado')
})
.catch((err) => {
  console.log({connect: err})
})

module.exports = connection