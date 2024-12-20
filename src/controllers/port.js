const {ipcMain} = require('electron')

const { SerialPort } = require('serialport');
const { DelimiterParser } = require('@serialport/parser-delimiter');

const {measurModel} = require('../models/indexModel');
const { promises } = require('original-fs');


class ReadingPort {

  port
  path
  parser
  cont=0

  constructor (path = 'COM3') {
    this.path = path
  }

  setPath(path){
    // Para modificar el puerto de entrada y salida
    this.path = path
  }

   async open(params,idMision){
    // Pregunta a la base de datos si la misión tiene datos recolectados en mediciones..
    const measur = await measurModel.findAll({
      where:{
        idMision:idMision
      }
    })

    console.log(JSON.stringify(measur))

    if(measur.length > 0){
      return  params.webContents.send('port:send',{ 
        cont: this.cont,
        message: "La misión ya tiene mediciones"
      })
    }

    // Inicializamos el objeto
    this.port = new SerialPort({
      path: this.path,
      autoOpen: false,
      baudRate: 9600
    });
    
    // Luego parseamos los datos de entrada y eliminamos el salto de linea
    this.parser = this.port.pipe(new DelimiterParser({ delimiter: '\r\n' }))

    // Abrimos el puerto
    this.port.open((err) => {
      if(err) return params.webContents.send('port:send',{
        cont:this.cont,
        message:"Leyendo datoss"
      })

        // Iniciamos lectura
        this.parser.on('data', async(data) => {
          if(!data){
            return console.log({data: null})

          }
          const [nd,temp,hum] = data.toString().split(" ")
          // console.log(data)
          const dataList = [{ 1:parseFloat(temp)},{2:parseFloat(hum)}]
          console.log(dataList)
          
          const date = new Date()
          //console.log("Isa")
  
          await Promise.all(
           dataList.map(async(el,i) => {
              await measurModel.create({ "idMision": idMision,"FechayHora":date ,"idSensor" :parseInt(Object.keys(el)[0]),"Valor":Object.values(el)[0],"Nodo": nd,"NroMedicion":this.cont})
           })
          )
  
  
          
  

          this.cont++

          //Enviamos los datos al preload para comunicacion con la interfaz
          params.webContents.send('port:send', {
            cont:this.cont,
            message:"Leyendo datos"
          })
          
          
        })
        //this.reading()
    })
  }

  close(params){
    // Cerramos el puerto
    this.port.close((err) => {
      if(err) return  params.webContents.send('port:send',{
        cont:this.cont,
        message:`Error al cerrar el puerto. ${err.message}`
      })

      this.cont=0
      return  params.webContents.send('port:send',{
        cont:this.cont,
        message:"Puerto cerrado"
      })

    })
  }

}

class ReadingPortLab {
  // Prueba
  on = 0
  cont = 0
  timeout
  
  reading(params,idMision){
    
    if(this.on === 1){ 
      this.timeout = setTimeout(async() => {
        console.log(idMision)
        // Pregunta a la base de datos si la misión tiene datos recolectados en mediciones..
        const measur = await measurModel.findAll({
          where:{
            idMision:idMision
          }
        })
    
        console.log(JSON.stringify(measur))
    
        if(measur.length > 0){
          return  params.webContents.send('port:send',{ 
            cont: this.cont,
            message: "La misión ya tiene mediciones"
          })
        }
        this.cont++
       

        const dataList = [1,{ 1:parseFloat((Math.random()*(40-30)).toFixed(2))},{2:parseFloat((Math.random() * (80 - 70) + 70).toFixed(2))}]
        
        const nodo = dataList[0]
        const date = new Date()
        console.log("Isa")

        await Promise.all(
          dataList.map(async(el,i) => {
            if(i!== 0) await measurModel.create({ "idMision": idMision,"FechayHora":date ,"idSensor" :parseInt(Object.keys(el)[0]),"Valor ":Object.values(el)[0],"Nodo": nodo})
          })
        )


        console.log("Datos enviados")

        //console.log(data)
        //console.log(dataList)
        //Enviamos los datos al preload para comunicacion con la interfaz
        params.webContents.send('port:send',{ 
          cont: this.cont,
          message: "Leyendo datos"
        })
        // Para ejecutar nuevamente el reading y generar un bucle cada 2 segundos
        this.reading(params,idMision)
      }, 2000)
    }
  }

  open(params,id){
    this.on = 1
    params.webContents.send('port:send', {
      cont: 0,
      message: "Puerto activo"
    })
    this.reading(params,id)
  }

  close(params){
    this.on = 0
    this.cont = 0
    clearTimeout(this.timeout)
    
    params.webContents.send('port:send', {
      cont: 0,
      message: "Puerto cerrado"
    })
  }

}

module.exports = {
  ReadingPort,
  ReadingPortLab
}