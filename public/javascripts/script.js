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
