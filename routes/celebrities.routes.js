const router = require('express').Router()
const celebrities= require('../models/Celebrity.model')




//Create celebs
router.get('/create', (req, res, next) => {
  res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res) => {
  const { name, occupation, catchPhrase } = req.body

  celebrities.create({ name, occupation, catchPhrase })
    .then(res.redirect('/celebrities'))
    .catch((err) => console.log(err))
})

// LISTA de celebs
router.get('/', (req, res, next) => {
  celebrities.find()
    .then((celebs) => {
      res.render('celebrities/celebrities', { celebs })
    })
    .catch((err) => console.log(err))
})



module.exports = router