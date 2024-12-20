const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

const {ReadingPort, ReadingPortLab} = require('./controllers/port')
const { SerialPort } = require('serialport');
const { DelimiterParser } = require('@serialport/parser-delimiter');

// Helpers
const {checkJWT} = require('./helpers/auth')

// Middlewares
const {verifyAdmin} = require('./middlewares/rol')

// Controller
const {login} = require('./controllers/users')
const {createMission, getMission, deleteMission} = require('./controllers/mission')
const {getMeasurByIdMission}= require('./controllers/measur')
const {createAccess, getAccess, getAccessById, deleteAccess} = require('./controllers/accessLevel')
const {createSensor, getSensors, updateSensor, deleteSensor} = require('./controllers/sensors')
const {createUser, getUserById, getUsers, updateUser, updateUserAccess, deleteUser} = require('./controllers/users')

// Ventana principal
let mainWin
const port = new ReadingPort()


const createWindowInitial = () => {
  mainWin =  new BrowserWindow({
    width: 700,
    height: 700,
    resizable: false,
    webPreferences:{
      // nodeIntegration: true,
      preload: path.join(__dirname, './ui/scripts/preload.js')
    }
  })

  mainWin.setMenuBarVisibility(false)
  // Vista inicial
  mainWin.loadFile('./ui/views/login.html')
}



// VENTANA PRINCIPAL
const loadViewMain = (e) => {
  mainWin.loadFile('./ui/views/main.html')
}

const loadViewAccess = async(e, token) => {
  // Cargamos la nueva vista
  const {success, user} = await checkJWT(token)

  if(!success){
    return mainWin.loadFile('./ui/views/notAccess.html')
  }

  const valid = verifyAdmin(user)
  if(!valid.success){
    return mainWin.loadFile('./ui/views/notAdmin.html')
  }

  mainWin.loadFile('./ui/views/access.html')
}


const loadViewSensors = async(e, token) => {
  // Cargamos la nueva vista
  const {success, user} = await checkJWT(token)

  if(!success){
    return mainWin.loadFile('./ui/views/notAccess.html')
  }

  const valid = verifyAdmin(user)
  if(!valid.success){
    return mainWin.loadFile('./ui/views/notAdmin.html')
  }

  mainWin.loadFile('./ui/views/sensors.html')
}

const loadViewUsers = async(e, token) => {
  // Cargamos la nueva vista
  // console.log(token)
  const {success, user} = await checkJWT(token)

  if(!success){
    return mainWin.loadFile('./ui/views/notAccess.html')
  }

  const valid = verifyAdmin(user)
  if(!valid.success){
    return mainWin.loadFile('./ui/views/notAdmin.html')
  }

  mainWin.loadFile('./ui/views/users.html')
}


const loadViewConfig = async(e, token) => {
  const {success, user} = await checkJWT(token)

  if(!success){
    return mainWin.loadFile('./ui/views/notAccess.html')
  }

  mainWin.loadFile('./ui/views/config.html')
}


const loadViewLogin = () => {
  mainWin.loadFile('./ui/views/login.html')
}



ipcMain.handle('api:login', (e, args) => {
  return login(args)
})


// MISSION
ipcMain.handle('api:createMission', (e, args) => {
  return createMission(args)
})

ipcMain.handle('api:getMission', (e) => {
  return getMission()
})

ipcMain.handle('api:deleteMission', async(e, args) => {
  
  const {data, token} = args
  const {success, user} = await checkJWT(token)

  if(!success){
    return mainWin.loadFile('./ui/views/notAccess.html')
  }

  const valid = verifyAdmin(user)
  if(!valid.success){
    return valid
  }

  return deleteMission(data)
})
// FIN MISSION

//MEDICIONES

ipcMain.handle('api:getMeasurByIdMission',async(e,args)=>{
  const{ data,token} = args

  const {success,user} = await checkJWT(token)
  if(!success){
    return mainWin.loadFile('./ui/views/notAccess.html')
  }

  return getMeasurByIdMission(data)

})

// FIN MEDICIONES

// ACCESS
ipcMain.handle('api:createAccess', async(e, args) => {
  const {data, token} = args
  
  const {success, user} = await checkJWT(token)

  if(!success){
    return mainWin.loadFile('./ui/views/notAccess.html')
  }

  const valid = verifyAdmin(user)
  if(!valid.success){
    return valid
  }

  return createAccess(data)
})

ipcMain.handle('api:getAccess', async(e, token) => {
  
  const {success, user} = await checkJWT(token)

  if(!success){
    return mainWin.loadFile('./ui/views/notAccess.html')
  }

  const valid = verifyAdmin(user)
  if(!valid.success){
    return valid
  }

  return getAccess()
})

ipcMain.handle('api:deleteAccess', async(e, args) => {
    
  const {data, token} = args
  const {success, user} = await checkJWT(token)

  if(!success){
    return mainWin.loadFile('./ui/views/notAccess.html')
  }

  const valid = verifyAdmin(user)
  if(!valid.success){
    return valid
  }

  return deleteAccess(data)
})

// FIN ACCESS

// SENSORS
ipcMain.handle('api:createSensor', async(e, args) => {
  const {data, token} = args
  
  const {success, user} = await checkJWT(token)

  if(!success){
    return mainWin.loadFile('./ui/views/notAccess.html')
  }

  const valid = verifyAdmin(user)
  if(!valid.success){
    return valid
  }

  return createSensor(data) //-----
})


ipcMain.handle('api:getSensors', async(e, token) => {
  
  const {success, user} = await checkJWT(token)

  if(!success){
    return mainWin.loadFile('./ui/views/notAccess.html')
  }

  const valid = verifyAdmin(user)
  if(!valid.success){
    return valid
  }

  return getSensors() // ----
})

ipcMain.handle('api:updateSensor', async(e, args) => {
  
  const {data, update, token} = args
  const {success, user} = await checkJWT(token)

  if(!success){
    return mainWin.loadFile('./ui/views/notAccess.html')
  }

  const valid = verifyAdmin(user)
  if(!valid.success){
    return valid
  }

  return updateSensor(data, update)
})

ipcMain.handle('api:deleteSensor', async(e, args) => {
  
  const {data, token} = args
  const {success, user} = await checkJWT(token)

  if(!success){
    return mainWin.loadFile('./ui/views/notAccess.html')
  }

  const valid = verifyAdmin(user)
  if(!valid.success){
    return valid
  }

  return deleteSensor(data) // ----
})
// FIN SENSORS

// USERS

ipcMain.handle('api:createUser', async(e, args) => {
  const {data, token} = args
  
  const {success, user} = await checkJWT(token)

  if(!success){
    return mainWin.loadFile('./ui/views/notAccess.html')
  }

  const valid = verifyAdmin(user)
  if(!valid.success){
    return valid
  }

  return createUser(data)
})


ipcMain.handle('api:getUsers', async(e, token) => {
  
  const {success, user} = await checkJWT(token)

  if(!success){
    return mainWin.loadFile('./ui/views/notAccess.html')
  }

  const valid = verifyAdmin(user)
  if(!valid.success){
    return valid
  }

  return getUsers()
})

ipcMain.handle('api:getUserById', async(e, token) => {
  
  const {success, user} = await checkJWT(token)

  if(!success){
    return mainWin.loadFile('./ui/views/notAccess.html')
  }

  const userJ = JSON.parse(user)
  return getUserById(userJ.idUsuario)
})

ipcMain.handle('api:updateUser', async(e, args) => {

  const {update, token} = args
  
  const {success, user} = await checkJWT(token)

  if(!success){
    return mainWin.loadFile('./ui/views/notAccess.html')
  }

  const userJ = JSON.parse(user)
  return updateUser(userJ.idUsuario, update)
})

ipcMain.handle('api:deleteUser', async(e, args) => {
  
  const {data, token} = args
  const {success, user} = await checkJWT(token)

  if(!success){
    return mainWin.loadFile('./ui/views/notAccess.html')
  }

  const valid = verifyAdmin(user)
  if(!valid.success){
    return valid
  }

  return deleteUser(valid.success, data)
})

ipcMain.handle('api:updateUserAccess', async(e, args) => {
  
  const {data, update, token} = args
  const {success, user} = await checkJWT(token)

  if(!success){
    return mainWin.loadFile('./ui/views/notAccess.html')
  }

  const valid = verifyAdmin(user)
  if(!valid.success){
    return valid
  }

  return updateUserAccess(valid.success, data, update)
})
// FIN USERS

// Recibe el id de la misión

const portOpen = (e,args) => {
  const{id,path}=args
  
  port.setPath(path)
  port.open(mainWin,id)
}

const portClose = () => {
  port.close(mainWin)
}


app.whenReady().then(() => {
  createWindowInitial()

  ipcMain.handle('port:open', portOpen)
  ipcMain.handle('port:close', portClose)

  ipcMain.handle('login:window', loadViewLogin)
  // Cierra el login y abre la ventana principal
  ipcMain.handle('main:window', loadViewMain)

  ipcMain.handle('access:window', loadViewAccess)

  ipcMain.handle('sensor:window', loadViewSensors)

  ipcMain.handle('users:window', loadViewUsers)

  ipcMain.handle('config:window', loadViewConfig)


  app.on('activate', () => {
    // Si no hay ventanas activas el inicia
    if(BrowserWindow.getAllWindows().length === 0) {
      createWindowInitial()
    }
  })

})