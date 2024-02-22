const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model')

router.get('/celebrities/create', (req, res) => {
  res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res) => {
  const { name, occupation, catchPhrase, url } = req.body

  Celebrity.create({ name, occupation, catchPhrase, url })
    .then(() => res.redirect('/celebrities'))
    .catch(() => res.render('celebrities/new-celebrity'))
})

router.get('/celebrities', (req, res) => {
  Celebrity.find()
    .then(celebs => res.render('celebrities/celebrities', { celebs }))
    .catch(err => console.log(err))
})

router.get('/celebrities/:celebrityId', (req, res) => {
  const { celebrityId } = req.params

  Celebrity.findById(celebrityId)
    .then(celebs => res.render('celebrities/celebrity-detail', celebs))
    .catch(err => console.log(err))
})

router.post('/celebrities/:celebrityId/delete', (req, res) => {
  const { celebrityId } = req.params

  Celebrity.findByIdAndDelete(celebrityId)
    .then(() => res.redirect('/celebrities'))
    .catch(err => console.log(err))
})

router.get('/celebrities/:celebrityId/edit', (req, res) => {
  const { celebrityId } = req.params

  Celebrity.findById(celebrityId)
    .then(celebs => res.render('celebrities/edit-celebrity', celebs))
    .catch(err => console.log(err))
})

router.post('/celebrities/:celebrityId/edit', (req, res) => {
  const { celebrityId } = req.params
  const { name, occupation, catchPhrase, url } = req.body

  Celebrity.findByIdAndUpdate(celebrityId, { name, occupation, catchPhrase, url })
    .then(() => res.redirect('/celebrities'))
    .catch(err => console.log(err))
})

module.exports = router;