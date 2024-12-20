const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('api',{

  // Recibe el contador desde el puerto y lo envia a la interfaz automaticamente
  portSend: (callback) => ipcRenderer.on('port:send', callback),
  portOpen: (args) => ipcRenderer.invoke('port:open', args),
  portClose: () => ipcRenderer.invoke('port:close'),

  // Abre login
  openWinInitial: () => ipcRenderer.invoke('login:window'),
  // Abre main
  closeWinInitial: () => ipcRenderer.invoke('main:window'),


  mainWindow: () => ipcRenderer.invoke('main:window'),
  
  accessWindow: (token) => ipcRenderer.invoke('access:window', token),
  sensorWindow: (token) => ipcRenderer.invoke('sensor:window', token),
  usersWindow: (token) => ipcRenderer.invoke('users:window', token),
  configWindow: (token) => ipcRenderer.invoke('config:window', token),

  login: (data) => {
    const result = ipcRenderer.invoke('api:login', data);
    return result
  },
  // MISSION
  createMissions: (data) => {
    const result = ipcRenderer.invoke('api:createMission', data)
    return result
  },
  getMissions: () => {
    const result = ipcRenderer.invoke('api:getMission')
    return result
  },
  deleteMissions: (data, token) => {
    const result = ipcRenderer.invoke('api:deleteMission', {data, token})
    return result
  },
  // FIN MISSION

  // MEDICION
  getMeasurByIdMission:(data,token) => ipcRenderer.invoke('api:getMeasurByIdMission',{data,token}),


  //FIN MEDICION

  // ACCESS
  createAccess: (data, token) => {
    const result = ipcRenderer.invoke('api:createAccess', {data, token})
    return result
  },
  getAccess: (token) => {
    const result = ipcRenderer.invoke('api:getAccess', token)
    return result
  },

  deleteAccess: (data, token) => {
    const result = ipcRenderer.invoke('api:deleteAccess', {data, token})
    return result
  },
  // FIN ACCESS

  // SENSORS
  createSensor: (data, token) => {
    const result = ipcRenderer.invoke('api:createSensor', {data, token})
    return result
  },
  getSensors: (token) => {
    const result = ipcRenderer.invoke('api:getSensors', token)
    return result
  },
  deleteSensor: (data, token) => {
    const result = ipcRenderer.invoke('api:deleteSensor', {data, token})
    return result
  },
  updateSensor: (data, update, token) => {
    const result = ipcRenderer.invoke('api:updateSensor', {data, update, token})
    return result
  },
  // FIN SENSORS

  // USERS
  createUser: (data, token) => {
    const result = ipcRenderer.invoke('api:createUser', {data, token})
    return result
  },
  getUsers: (token) => {
    const result = ipcRenderer.invoke('api:getUsers', token)
    return result
  },
  getUserById: (token) => {
    const result = ipcRenderer.invoke('api:getUserById', token)
    return result
  },
  updateUser: (update, token) => {
    const result = ipcRenderer.invoke('api:updateUser', {update, token})
    return result
  },
  deleteUser: (data, token) => {
    const result = ipcRenderer.invoke('api:deleteUser', {data, token})
    return result
  },
  updateUserAccess: (data, update, token) => {
    const result = ipcRenderer.invoke('api:updateUserAccess', {data, update, token})
    return result
  },

  // FIN USERS

})