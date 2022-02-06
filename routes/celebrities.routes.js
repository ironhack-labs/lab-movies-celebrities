const router = require('express').Router()
const Celebrity = require('../models/Celebrity.model')

router.get('/', (req, res, next) => {
  Celebrity.find()
    .then((celebs) => {
      res.render('celebrities/celebrities', { celebs })
    })
    .catch((err) => console.log(err))
})

//Details
router.get('/details/:id', (req, res) => {
  Celebrity.findById(req.params.id)

    .then((celebrity) => {
      res.render('celebrities/celebrities-details', { celebrity })
    })
    .catch((err) => console.log(err))
})

//Create
router.get('/create', (req, res, next) => {
  res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res) => {
  const { name, occupation, catchPhrase } = req.body

  Celebrity.create({ name, occupation, catchPhrase })
    .then(res.redirect('/celebrities'))
    .catch((err) => console.log(err))
})

//Delete
router.post('/:id/delete', (req, res) => {
  Celebrity.findByIdAndDelete(req.params.id)

    .then(res.redirect('/celebrities'))
    .catch((err) => console.log(err))
})

//Update
router.get('/:id/edit', (req, res) => {
  Celebrity.findById(req.params.id)
    .then((celebrity) => {
      res.render('celebrities/edit-celebrity', celebrity)
    })
    .catch((err) => console.log(err))
})

router.post('/:id/edit', (req, res) => {
  //console.log(req.body)

  const { name, occupation, catchPhrase } = req.body
  Celebrity.findByIdAndUpdate(req.params.id, { name, occupation, catchPhrase })
    .then(() => res.redirect(`/celebrities/details/${req.params.id}`))
    .catch((err) => console.log(err))
})

module.exports = router
