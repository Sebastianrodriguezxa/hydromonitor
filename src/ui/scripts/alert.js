const alertL = document.getElementById("alert-login")

// TAREAS
//[+] Modificar para quitar los estilos en el hidden

const hiddenAlert = () => {
  setTimeout(() => {
    // alertL.style.display = 'none'
    alertL.innerHTML = ""
    alertL.classList.remove('alert-login')
    alertL.classList.remove('alert-login-access')
    alertL.classList.remove('alert-login-denied')
  }, 2500);
}

// TAREAS
//[+] Crear para mostrar alert y su mensaje
//[+] Añadir estilo rojo y verde
//[+] Añadir el hidden dentro
const viewAlert = (success, message) => {
  alertL.classList.add('alert-login')
  alertL.innerHTML = message

  if(!success){
    alertL.classList.add('alert-login-denied')
    hiddenAlert()
    return
  }

  alertL.classList.add('alert-login-access')
  hiddenAlert()
}