

const viewNotify = (id, type, message) => {
  // console.log(id)
  const notify = document.getElementById(id)

  notify.classList.remove('dontDisplay')

  if(message === "") {
    notify.classList.add('dontDisplay')
    return
  }

  notify.innerHTML = `
    <div class="alert alert-${type}" role="alert">
      ${message}
    </div>
  `

  setTimeout(() => {
    notify.classList.add('dontDisplay')
  }, 1000)

}