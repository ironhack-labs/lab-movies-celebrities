const router = require('express').Router()
const Celebrity = require('../models/Celebrity.model')

router.get('/celebrities', async (req, res) => {
  try {
    const celebs = await Celebrity.find()
    res.render('celebrities/celebrities', { celebs })
  } catch (e) {
    console.log('There has been a problem...', e)
  }
})

router.get('/celebrities/create', async (req, res) => {
  res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', async (req, res) => {
  const newCelebrity = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  }

  try {
    await Celebrity.create(newCelebrity)
    res.redirect('/celebrities')
  } catch (e) {
    const error = new Error('Something went wrong. Please try again.')
    console.log('An error ocurred at /celebrities/create... error: ', error.message)
    res.render('celebrities/new-celebrity', { error: error.message })
  }
})

module.exports = router
