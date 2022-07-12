document.addEventListener(
  'DOMContentLoaded',
  () => {
    console.log('IronGenerator JS imported successfully!')
  },
  false
)

document.getElementById('mov-delete').addEventListener('click', (ev) => {
  const resp = window.confirm('are you sure?')
  if (!resp) {
    ev.preventDefault()
  }
})
