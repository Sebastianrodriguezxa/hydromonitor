const access = document.getElementById('accessProfile')

const inputUserName1 = document.getElementById('name1')
const validationUserName1 = document.getElementById('valid-feedback-name1')

const inputUserName2 = document.getElementById('name2')
const validationUserName2 = document.getElementById('valid-feedback-name2')

const inputUserLastName1 = document.getElementById('lastName1')
const validationUserLastName1 = document.getElementById('valid-feedback-lastName1')

const inputUserLastName2= document.getElementById('lastName2')
const validationUserLastName2 = document.getElementById('valid-feedback-lastName2')

const inputUsername = document.getElementById('username')
const validationUsername = document.getElementById('valid-feedback-username')

const inputPassword = document.getElementById('password')
const validationPassword = document.getElementById('valid-feedback-password')

const selectAccessUser = document.getElementById('selectAccessUser')


const selectUpdateAccessUser = document.getElementsByClassName('form-select-update')

const btnCreateUser = document.getElementById('updateUser')

const listUsers = document.getElementById('list-users')

// const dropdownElementList = document.querySelectorAll('.dropdown-toggle')
// const dropdownList = [...dropdownElementList].map(dropdownToggleEl => new bootstrap.Dropdown(dropdownToggleEl))

const getUsers = async() => {
  const token = localStorage.getItem('token')

  const result  = await window.api.getUserById(token)
  const res = JSON.parse(result.res)

  const a = res.AccessLevel.Nombre

  if(a === "Admin"){
    access.textContent = a
    access.classList.add("text-bg-danger")
  }

  if(a === "Operador"){
    access.textContent = a
    access.classList.add("text-bg-primary")
  }

  inputUserName1.value = res.Nombre1
  inputUserName2.value = res.Nombre2
  inputUserLastName1.value = res.Apellido1
  inputUserLastName2.value = res.Apellido2

  inputUsername.value = res.LoginName
  inputPassword.value = ""
}

window.addEventListener('load', (e) => {
  // validationCodAccess.classList.remove('valid-feedback-cod-Access')
  addDontDisplay(validationUserName1)
  addDontDisplay(validationUserName2)
  addDontDisplay(validationUserLastName1)
  addDontDisplay(validationUserLastName2)
  addDontDisplay(validationUsername)
  addDontDisplay(validationPassword)
})

btnCreateUser.addEventListener('click', async(e) => {
  e.preventDefault();
  if(inputUserName1.value === ""){
    removeDontDisplay(validationUserName1)
    clearValidations(validationUserName1)
    return 
  }

  if(inputUserLastName1.value === ""){
    removeDontDisplay(validationUserLastName1)
    clearValidations(validationUserLastName1)
    return 
  }

  if(inputUserLastName2.value === ""){
    removeDontDisplay(validationUserLastName2)
    clearValidations(validationUserLastName2)
    return 
  }

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


  const data = {
    name1: inputUserName1.value,
    name2: inputUserName2.value,
    lastName1: inputUserLastName1.value,
    lastName2: inputUserLastName2.value,
    loginName: inputUsername.value,
    password: inputPassword.value
  }

  // console.log(data)
  const res = await window.api.updateUser(data, token)
  if(!res.success){
    viewNotify('notify', 'danger', res.message)
    getUsers()
    return
  }

  viewNotify('notify', 'success', res.message)
  getUsers()
  // console.log(res)
})

getUsers()

