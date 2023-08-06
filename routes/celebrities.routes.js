const router = require('express').Router()

const Celebrity = require('../models/Celebrity.model')

router.get('/', (req, res) => {
  Celebrity.find()
    .then((celebrities) => res.render('celebrities/celebrities', { celebrities }))
    .catch((err) => console.log(err))
})

router.get('/create', (req, res) => {
  res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res) => {
  const { name, occupation, catchPhrase } = req.body

  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.redirect('/celebrities'))
    .catch((err) => {
      console.log(err)
      res.redirect('/create')
    })
})

module.exports = router
