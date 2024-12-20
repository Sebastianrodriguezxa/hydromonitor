const inputCodAccess = document.getElementById('codAccess')
const validationCodAccess = document.getElementById('valid-feedback-cod-access')

const inputNameAccess = document.getElementById('nameAccess')
const validationNameAccess = document.getElementById('valid-feedback-name-access')

const btnCreateAccess = document.getElementById('createAccess')

const listAccess = document.getElementById('list-access')

const getAccess = async() => {
  const token = localStorage.getItem('token')

  const result  = await window.api.getAccess(token)
  // console.log(JSON.parse(result.res))
  listAccess.innerHTML = ""
  JSON.parse(result.res).forEach(el => {
    listAccess.innerHTML += `
      <tr>
        <td>${el.Codigo}</td>
        <td>${el.Nombre}</td>
        <td>
        <button href="#" class="btn btn-danger" onclick="deleteAccess(${el.idAccess})">Eliminar</button>
        </td>
      </tr>
    `
  })
}

window.addEventListener('load', (e) => {
  // validationCodAccess.classList.remove('valid-feedback-cod-Access')
  addDontDisplay(validationCodAccess)
  addDontDisplay(validationNameAccess)
})

btnCreateAccess.addEventListener('click', async(e) => {
  e.preventDefault();

  if(inputCodAccess.value === "" && inputNameAccess.value === ""){
    removeDontDisplay(validationCodAccess)
    removeDontDisplay(validationNameAccess)

    clearValidations(validationCodAccess)
    clearValidations(validationNameAccess)

    return
  }

  if(inputCodAccess.value === ""){
    removeDontDisplay(validationCodAccess)
    clearValidations(validationCodAccess)
    return 
  }

  if(inputNameAccess.value === ""){
    removeDontDisplay(validationNameAccess)
    clearValidations(validationNameAccess)
    return
  }

  const token = localStorage.getItem('token')

  const data = {
    cod: inputCodAccess.value,
    name: inputNameAccess.value
  }

  const res = await window.api.createAccess(data, token)
  if(!res.success){
    viewNotify('notify', 'danger', res.message)
    getAccess()
    return
  }

  viewNotify('notify', 'success', res.message)
  getAccess()
  // console.log(res)
})

const deleteAccess = async(id) => {
  const token = localStorage.getItem('token')

  const res = await window.api.deleteAccess(id, token)
  if(!res.success){
    viewNotify('alert', 'danger', res.message)
    getAccess()
    return
  }

  viewNotify('alert', 'success', res.message)
  getAccess()
}


getAccess()