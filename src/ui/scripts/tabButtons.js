const tabsButton = document.getElementsByClassName('nav-link')

for (let i = 0; i < tabsButton.length; i++){
  tabsButton[i].addEventListener('click', (e) => {
    // e.preventDefault()
    const id = e.target.getAttribute('id')
    const token = localStorage.getItem('token')
    // console.log(token)
    
    if(id === "mission"){
      // idButton.classList.add('active')
      window.api.mainWindow()
    }

    if(id === "access"){
      // idButton.classList.add('active')
      window.api.accessWindow(token)
    }

    if(id === "sensors"){
      window.api.sensorWindow(token)
    }

    if(id === "users"){
      window.api.usersWindow(token)
    }

    if(id === "config"){
      window.api.configWindow(token)
    }

  })
}
