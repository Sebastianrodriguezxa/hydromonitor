const btnLogout = document.getElementById('logout')

btnLogout.addEventListener('click', (e) => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  
  window.api.openWinInitial()
})