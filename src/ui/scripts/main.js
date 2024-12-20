const inputCodMission = document.getElementById('codMission')
const validationCodMission = document.getElementById('valid-feedback-cod-mission')

const inputNameMission = document.getElementById('nameMission')
const validationNameMission = document.getElementById('valid-feedback-name-mission')

const btnCreateMission = document.getElementById('createMission')

const listCardMission = document.getElementById('list-card-mission')

const viewMeasur = document.getElementById('view-measur')

const btnDetails = document.getElementsByClassName('details')

const btnReads = document.getElementsByClassName('reads')

const modal = document.getElementById('modal')

const btnCloseModal = document.getElementById('close-modal')

const missionModal = document.getElementById('mission-modal')

const tableBodyModal = document.getElementById('table-body-modal')

//Lectura de puerto
const countMeasur = document.getElementById('count-measur')
const measur = document.getElementById('measur')
const tableBodyMeasur = document.getElementById("table-body-measur")

let idMissionRead = 0

const getMission = async () => {
  const result = await window.api.getMissions()
  // console.log(result.res)
  listCardMission.innerHTML = ""
  JSON.parse(result.res).forEach(el => {
    listCardMission.innerHTML += `
      <div class="card text-center">
        <div class="card-header">
        <h5 class="card-title">${el.Nombre}</h5>
        </div>
        <div class="card-body">
  
          <button  class="details btn btn-primary" id-mission=${el.idMision}>Detalle</button>
          <button  class="btn btn-danger" onclick="deleteMission(${el.idMision})">Eliminar</button>
          <button  class="reads btn btn-primary" id-mision=${el.idMision}>Lectura</button>
        </div>
        <div class="card-footer text-body-secondary">
          ${el.Fecha}
        </div>
      </div>
    `
  })

  for (let i = 0; i < btnDetails.length; i++) {
    btnDetails[i].addEventListener('click', async(e) => {
      const idMission = e.target.getAttribute('id-mission')

      const token = localStorage.getItem('token')

      const result = await window.api.getMeasurByIdMission(idMission, token)
      

      if(!result.success){
        return viewNotify('alert', 'danger', result.message)
      }

      console.log(JSON.parse(result.res))


      tableBodyModal.innerHTML = ""
      JSON.parse(result.res).forEach(el => {
        tableBodyModal.innerHTML +=
          ` <tr>
        <td>${el.FechayHora}</td>
        <td>${el.Valor}</td>
        <td>${el.Sensore.Nombre}</td>
     </tr>`
      });



      missionModal.innerHTML = idMission
      modal.showModal()
    })

  }

  for (let i = 0; i < btnReads.length; i++) {
    btnReads[i].addEventListener('click',(e) => {
      idMissionRead = e.target.getAttribute('id-mision')

      viewMeasur.classList.toggle('dontDisplay')
      viewMeasur.classList.toggle('div-measur-mission')
   
      //viewMeasur.classList.remove('dontDisplay')
      //viewMeasur.classList.add('div-measur-mission')
    })
    
  }

}

btnCloseModal.addEventListener('click', (e) => {
  modal.close()
})

window.addEventListener('load', (e) => {
  // validationCodMission.classList.remove('valid-feedback-cod-mission')
  addDontDisplay(validationCodMission)
  addDontDisplay(validationNameMission)
})

btnCreateMission.addEventListener('click', async (e) => {
  e.preventDefault();

  if (inputCodMission.value === "" && inputNameMission.value === "") {
    removeDontDisplay(validationCodMission)
    removeDontDisplay(validationNameMission)

    clearValidations(validationCodMission)
    clearValidations(validationNameMission)

    return
  }

  if (inputCodMission.value === "") {
    removeDontDisplay(validationCodMission)
    clearValidations(validationCodMission)
    return
  }

  if (inputNameMission.value === "") {
    removeDontDisplay(validationNameMission)
    clearValidations(validationNameMission)
    return
  }

  const userJson = localStorage.getItem('user')
  const user = JSON.parse(userJson)

  const data = {
    cod: inputCodMission.value,
    name: inputNameMission.value,
    idUser: user.idUsuario
  }

  const res = await window.api.createMissions(data)
  if (!res.success) {
    viewNotify('notify', 'danger', res.message)
    getMission()
    return
  }

  viewNotify('notify', 'success', res.message)
  getMission()
  // console.log(res)
})

const deleteMission = async (id) => {

  const token = localStorage.getItem('token')

  const res = await window.api.deleteMissions(id, token)
  if (!res.success) {
    viewNotify('alert', 'danger', res.message)
    getMission()
    return
  }

  viewNotify('alert', 'success', res.message)
  getMission()
}

//Iniciar medición.

document.getElementById('start').addEventListener('click', (e) => {
  e.preventDefault()

  console.log(idMissionRead)

  // window.api.portOpen({id:idMissionRead,path:'COM3'})

  // window.api.portSend(async(event, value) => {
  //   countMeasur.innerHTML = `${value?.cont || countMeasur.textContent}`
  //   measur.innerHTML = `${value?.message}`

  //   const token = localStorage.getItem('token')

  //   const result = await window.api.getMeasurByIdMission(idMissionRead,token)
  //   console.log(result)


  //   tableBodyMeasur.innerHTML = ""
  //   JSON.parse(result.res).forEach(el=> {
  //     tableBodyMeasur.innerHTML +=
  //   ` <tr>
  //       <td>${el.FechayHora}</td>
  //       <td>${el.Valor}</td>
  //    </tr>`
  //   });
  // })
})

document.getElementById('stop').addEventListener('click', (e) => {
  e.preventDefault()

  window.api.portClose()
})



getMission()