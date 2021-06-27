document.addEventListener(
  'DOMContentLoaded',
  () => {
    console.log('IronGenerator JS imported successfully!')
  },
  false
)

window.addEventListener('load', () => {
  let width = window.innerWidth

  width < 768 ? (document.querySelector('main').style.height = 'auto') : null
})
const nameArray = []
const idArray = []
document.querySelector('#select').addEventListener('change', e => {
  const id = e.currentTarget.value
  const name = e.currentTarget.selectedOptions[0].textContent

  const celebIds = document.querySelector('#celebIds')
  const textArea = document.querySelector('textarea')

  if (name != 'Select your celebrity') {
    nameArray.push(name)
    console.log(nameArray)
    const nameSet = [...new Set(nameArray)]
    textArea.textContent = nameSet.join('\n')

    if (id != '') {
      idArray.push(id)
      const idSet = [...new Set(idArray)]
      celebIds.value = idSet.join()
    }
  }
})
