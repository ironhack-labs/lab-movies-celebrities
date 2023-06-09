const router = require('express').Router()
const Celebrity = require('../models/Celebrity.model')

// GET /celebrities/create
router.get('/celebrities/create', (req, res, next) => { 
  res.render('celebrities/new-celebrity.hbs')
})

// POST /celebrities/create
router.post('/celebrities/create', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body
  Celebrity
    .create({ name, occupation, catchPhrase })
    .then(celebrity => {
      console.log('New celebrity created successfully')
      res.redirect('/celebrities')
    })
  .catch(err => {
    console.log('Error@POST-New_celebrity: ', err)
    res.redirect('/celebrities/create')
  })
})

module.exports = router