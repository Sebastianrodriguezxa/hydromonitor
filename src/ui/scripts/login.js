
const user = document.getElementById('user')
const password = document.getElementById('password')
const btn = document.getElementById('login')

const btnNext = document.getElementById('next');


//TAREAS
//[] añadir la funcion que mostrara el alert

btn.addEventListener('click', async() => {
  const ALERT = Object.freeze({
    LOGGED: "Ha iniciado sesion correctamente",
    FAIL: "Por favor introduzca usuario y/o contraseña"
  })

  if(user.value === ''){
    return viewAlert(false, ALERT.FAIL)
  }

  if(password.value === ''){
    return viewAlert(false, ALERT.FAIL)
  }

  if(user.value === '' && password.value === ''){
    return viewAlert(false, ALERT.FAIL)
  }

  btn.textContent = "Iniciando sesion..."
  const result = await window.api.login({
    userName: user.value, 
    password: password.value
  })

  if(!result.success){
    btn.textContent = "Iniciar sesion"
    return viewAlert(result.success, result.message)
  }


  const {idUsuario, LoginName, AccessLevel} = JSON.parse(result.res)
  const userJson = {
    idUsuario,
    LoginName,
    rol: AccessLevel.Nombre
  }

  // console.log(result.token)

  localStorage.setItem('user', JSON.stringify(userJson));
  localStorage.setItem('token', result.token);

  viewAlert(result.success, result.message)
  // Pasamos a la ruta home para cargar el archivo main
  setTimeout(() => {
    window.api.closeWinInitial();
  }, 2500)
  // window.location.href = '/';

})


btnNext.addEventListener('click', (e) => {
  window.api.closeWinInitial()
})