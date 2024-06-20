const router = require('express').Router()
const Celebrity = require('../models/Celebrity.model')

// GET /celebrities/create
router.get('/create', (req, res, next) => { 
  res.render('celebrities/new-celebrity.hbs')
})

// POST /celebrities/create
router.post('/create', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body
  Celebrity
    .create({ name, occupation, catchPhrase })
    .then(celebrity => {
      console.log('New celebrity created successfully')
      res.redirect('/celebrities')
    })
  .catch(err => {
    console.log('Error @ POST /celebrities/create: ', err)
    res.redirect('/celebrities/create')
  })
})

// GET /celebrities
router.get('/', (req, res, next) => { 
  Celebrity
    .find()
    .then(allCelebrities => res.render('celebrities/celebrities.hbs', { celebrity: allCelebrities }))
    .catch(err => console.log('Error @ GET /celebrities: ', err))
})

// GET /celebrities/:celibrityId
router.get("/:celebrityId", (req, res, next) => {
  const { celebrityId: celebrityId } = req.params
  Celebrity.findById(celebrityId)
    .then((celebrity) => res.render("celebrities/celebrity-details.hbs", { celebrity }))
    .catch((err) => console.log("Error @ GET /celebrities/:celebrityId", err))
})

// POST /celebrity/:celebrityId/delete
router.post('/:celebrityId/delete', (req, res, next) => { 
  const { celebrityId } = req.params
  Celebrity
    .findByIdAndDelete(celebrityId)
    .then(() => res.redirect('/celebrities'))
    .catch((err) => console.log("Error @ POST /celebrity/:celebrityId/delete", err))
})

module.exports = router
