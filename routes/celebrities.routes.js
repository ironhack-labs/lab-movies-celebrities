const router = require("express").Router();

// all your routes here
const Celebrity = require("../models/Celebrity.model")

router.get('/create', (req, res, next) => { 
  res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res, next) => { 
  const { name, occupation, catchPhrase } = req.body
  
  Celebrity
    .create({ name, occupation, catchPhrase })
    .then(() => res.redirect('/celebrities'))
    .catch(err => console.log('Error @ POST /create: ', err))
})

router.get('/', (req, res, next) => { 
  Celebrity
    .find()
    .then(allCelebrities => res.render('celebrities/celebrities', {celebrity: allCelebrities}))
})

module.exports = router;