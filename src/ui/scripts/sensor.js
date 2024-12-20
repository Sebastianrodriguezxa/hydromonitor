const inputCodSensor = document.getElementById('codSensor')
const validationCodSensor = document.getElementById('valid-feedback-cod-sensor')

const inputTypeSensor = document.getElementById('typeSensor')
const validationTypeSensor = document.getElementById('valid-feedback-type-sensor')

const selectUpdateStatusSensor = document.getElementsByClassName('form-select-update')

const btnCreateSensor = document.getElementById('createSensor')

const listSensor = document.getElementById('list-sensors')

const getSensors = async() => {
  const token = localStorage.getItem('token')

  const result  = await window.api.getSensors(token)
  // console.log(JSON.parse(result.res))
  listSensor.innerHTML = ""
  JSON.parse(result.res).forEach(el => {
    listSensor.innerHTML += `
      <tr>
        <td>${el.Codigo}</td>
        <td>${el.Nombre}</td>
        <td>
          <div class="col-md-4">
            <select class="form-select form-select-update" id-sensor=${el.idSensor} status=${el.Estado} id="selectUpdateStatusSensor" aria-label="Default select example"></select>
          </div>
        </td>
        <td>
        <button href="#" class="btn btn-danger" onclick="deleteSensor(${el.idSensor})">Eliminar</button>
        </td>
      </tr>
    `
  })

  const listStatus = [
    {idEstado: 1, Estado: "Activo"},
    {idEstado: 2, Estado: "Inactivo"}
  ]
  
  for (let i = 0; i < selectUpdateStatusSensor.length; i++){
    
    selectUpdateStatusSensor[i].innerHTML = ''
    const status = selectUpdateStatusSensor[i].getAttribute('status')
    
    let optionElement = document.createElement('option')
    optionElement.value = 1;
    optionElement.text = status
    selectUpdateStatusSensor[i].appendChild(optionElement)

    listStatus.forEach((el) => {

      if(el.Estado != status){
        let optionElement = document.createElement('option')
        optionElement.value = el.idEstado;
        optionElement.text = el.Estado
  
        selectUpdateStatusSensor[i].appendChild(optionElement)
      }
    })
    
  }

  for (let i = 0; i < selectUpdateStatusSensor.length; i++) {
    selectUpdateStatusSensor[i].addEventListener('change', async(e) => {
      const idSensor = e.target.getAttribute('id-sensor')
      const status = selectUpdateStatusSensor[i].options[selectUpdateStatusSensor[i].selectedIndex].text

      const res = await window.api.updateSensor(idSensor, status, token)
      // console.log(res)
      if(!res.success){
        viewNotify('alert', 'danger', res.message)
        return getSensors()
        
      }

      viewNotify('alert', 'success', res.message)
    })
    
  }
}

window.addEventListener('load', (e) => {
  // validationCodAccess.classList.remove('valid-feedback-cod-Access')
  addDontDisplay(validationCodSensor)
  addDontDisplay(validationTypeSensor)
})

btnCreateSensor.addEventListener('click', async(e) => {
  e.preventDefault();

  if(inputCodSensor.value === "" && inputTypeSensor.value === ""){
    removeDontDisplay(validationCodSensor)
    removeDontDisplay(validationTypeSensor)

    clearValidations(validationCodSensor)
    clearValidations(validationTypeSensor)

    return
  }

  if(inputCodSensor.value === ""){
    removeDontDisplay(validationCodSensor)
    clearValidations(validationCodSensor)
    return 
  }

  if(inputTypeSensor.value === ""){
    removeDontDisplay(validationTypeSensor)
    clearValidations(validationTypeSensor)
    return
  }

  const token = localStorage.getItem('token')

  const data = {
    cod: inputCodSensor.value,
    name: inputTypeSensor.value
  }

  const res = await window.api.createSensor(data, token)
  if(!res.success){
    viewNotify('notify', 'danger', res.message)
    getSensors()
    return
  }

  viewNotify('notify', 'success', res.message)
  getSensors()
  // console.log(res)
})

const deleteSensor = async(id) => {
  const token = localStorage.getItem('token')

  const res = await window.api.deleteSensor(id, token)
  if(!res.success){
    viewNotify('alert', 'danger', res.message)
    getSensors()
    return
  }

  viewNotify('alert', 'success', res.message)
  getSensors()
}


getSensors()