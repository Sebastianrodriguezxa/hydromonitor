
const addDontDisplay = (html) => {
  html.classList.add('dontDisplay')
}

const removeDontDisplay = (html) => {
  html.classList.remove('dontDisplay')
}

const clearValidations = (html) => {
  html.style.color = "red"
  setTimeout(() => {
    html.style.color = "black"
    html.classList.add('dontDisplay')
  }, 2000)
}