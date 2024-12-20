const inputUsername = document.getElementById('username')
const validationUsername = document.getElementById('valid-feedback-username')

const inputPassword = document.getElementById('password')
const validationPassword = document.getElementById('valid-feedback-password')

const selectAccessUser = document.getElementById('selectAccessUser')


const selectUpdateAccessUser = document.getElementsByClassName('form-select-update')

const btnCreateUser = document.getElementById('createUser')

const listUsers = document.getElementById('list-users')

// const dropdownElementList = document.querySelectorAll('.dropdown-toggle')
// const dropdownList = [...dropdownElementList].map(dropdownToggleEl => new bootstrap.Dropdown(dropdownToggleEl))

const getUsers = async() => {
  const token = localStorage.getItem('token')

  const result  = await window.api.getUsers(token)
  const resultAccess = await window.api.getAccess(token)
  // console.log(JSON.parse(resultAccess.res))
  
  selectAccessUser.innerHTML = ''
  JSON.parse(resultAccess.res).forEach((el) => {
    let optionElement = document.createElement('option')
    optionElement.value = el.idAccess;
    optionElement.text = el.Nombre

    selectAccessUser.appendChild(optionElement)
  })

  listUsers.innerHTML = ""
  JSON.parse(result.res).forEach(el => {
    // console.log(el)
    listUsers.innerHTML += `
      <tr>
        <td>${el.Nombre1}</td>
        <td>${el.Nombre2}</td>
        <td>${el.LoginName}</td>
        <td>
          <div class="col-md-4">
            <select class="form-select form-select-update" user-id=${el.idUsuario} access-id=${el.AccessLevel.idAccess} access-desc=${el.AccessLevel.Nombre} id="selectUpdateAccessUser" aria-label="Default select example"></select>
          </div>
        </td>
        <td>
          <button href="#" class="btn btn-danger" onclick="deleteUser(${el.idUsuario})">Eliminar</button>
        </td>
      </tr>
    `
  })

  for (let i = 0; i < selectUpdateAccessUser.length; i++){
    
    selectUpdateAccessUser[i].innerHTML = ''
    const accesId = selectUpdateAccessUser[i].getAttribute('access-id')
    const access = selectUpdateAccessUser[i].getAttribute('access-desc')
    
    let optionElement = document.createElement('option')
    optionElement.value = accesId;
    optionElement.text = access
    selectUpdateAccessUser[i].appendChild(optionElement)

    JSON.parse(resultAccess.res).forEach((el) => {

      if(el.Nombre != access){
        let optionElement = document.createElement('option')
        optionElement.value = el.idAccess;
        optionElement.text = el.Nombre
  
        selectUpdateAccessUser[i].appendChild(optionElement)
      }
    })
    
  }

  
  for (let i = 0; i < selectUpdateAccessUser.length; i++){
    selectUpdateAccessUser[i].addEventListener('change', async(e) => {
      const idUsuario = e.target.getAttribute('user-id')
      const idAccess = selectUpdateAccessUser[i].value
      // console.log(idUsuario,' ', idAccess,' ', token)
      // console.log(idAccess)
      const res = await window.api.updateUserAccess(idUsuario, idAccess, token)
      // console.log(res)
      if(!res.success){
        viewNotify('alert', 'danger', res.message)
        return getUsers()
        
      }

      viewNotify('alert', 'success', res.message)

    })
  }

}

window.addEventListener('load', (e) => {
  // validationCodAccess.classList.remove('valid-feedback-cod-Access')
  addDontDisplay(validationUsername)
  addDontDisplay(validationPassword)
})

btnCreateUser.addEventListener('click', async(e) => {
  e.preventDefault();

  if(inputUsername.value === "" && inputUsername.value === ""){
    removeDontDisplay(validationUsername)
    removeDontDisplay(validationPassword)

    clearValidations(validationUsername)
    clearValidations(validationPassword)

    return
  }

  if(inputUsername.value === ""){
    removeDontDisplay(validationUsername)
    clearValidations(validationUsername)
    return 
  }

  if(inputPassword.value === ""){
    removeDontDisplay(validationPassword)
    clearValidations(validationPassword)
    return
  }



  const token = localStorage.getItem('token')

  const selectIndex = selectAccessUser.selectedIndex

  const data = {
    loginName: inputUsername.value,
    password: inputPassword.value,
    idAccessLevel: parseInt(selectAccessUser.options[selectIndex].value)
  }

  // console.log(data)
  const res = await window.api.createUser(data, token)
  if(!res.success){
    viewNotify('notify', 'danger', res.message)
    getUsers()
    return
  }

  viewNotify('notify', 'success', res.message)
  getUsers()
  // console.log(res)
})

const deleteUser = async(id) => {
  const token = localStorage.getItem('token')

  const res = await window.api.deleteUser(id, token)
  if(!res.success){
    viewNotify('alert', 'danger', res.message)
    getUsers()
    return
  }

  viewNotify('alert', 'success', res.message)
  getUsers()
}


getUsers()

