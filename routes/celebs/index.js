const router = require('express').Router()
const Celeb = require('../../models/Celebrity.model')

// create celebrity
router.get('/celebrities/create', (req, res) => res.render('celebs/create-celeb'))

router.post('/celebrities/create', (req, res) => {
  let { name, occupation, image, catchPhrase } = req.body
  if (image === '') image = undefined
  if (occupation === '') occupation = undefined
  if (catchPhrase === '') catchPhrase = undefined

  Celeb.create({ name, occupation, image, catchPhrase })
    .then(celeb => res.redirect('/celebrities'))
    .catch(err => res.redirect('/celebrities/create'))
})

// list celebrity

router.get('/celebrities', (req, res) => {
  Celeb.find()
    .then(celeb => res.render('celebs/celebs', { celeb }))
    .catch(err => console.log(err))
})

// detail celeb
router.get('/celebrity/:id', (req, res) => {
  const { id } = req.params
  Celeb.findById(id)
    .then(celeb => res.render('celebs/celeb-details', { celeb }))
    .catch(err => console.log(err))
})

router.get('/celeb/:id/edit', (req, res) => {
  const { id } = req.params

  Celeb.findById(id)
    .then(celeb => res.render('celebs/edit-celeb', { celeb }))
    .catch(err => console.log(err))
})

// edit

router.post('/celeb/:id/edit', (req, res) => {
  const { id } = req.params

  const { name, occupation, image, catchPhrase } = req.body

  Celeb.findByIdAndUpdate(id, { name, occupation, image, catchPhrase }, { new: true })
    .then(celeb => res.redirect(`/celebrity/${id}`))
    .catch(err => console.log(err))
})

// delete

router.post('/celeb/:id/delete', (req, res) => {
  const { id } = req.params

  Celeb.findByIdAndDelete(id)
    .then(celeb => res.redirect('/celebrities'))
    .catch(err => console.log(err))
})

module.exports = router
