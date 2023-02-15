const router = require('express').Router()
const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')
// Iteration #3: Adding New Celebrities
router.get('/create', async (req, res, next) => {
  try {
    res.render('celebrities/new-celebrity')
  } catch (error) {
    next(error)
  }
})

router.post('/create', async (req, res, next) => {
  // console.log(req.body)
  const { name } = req.body
  if (name === '') {
    return res.render('celebrities/new-celebrity', {
      errorMessage: 'You need a name in order to create a celebrity',
    })
  }
  //res.send(req.body)
  try {
    //await Celebrity.deleteMany()
    const { name, occupation, catchPhrase } = req.body
    const createdCelebrity = await Celebrity.create({
      name,
      occupation,
      catchPhrase,
    })
    //console.log(createdCelebrity)
    res.redirect('/celebrities')
  } catch (error) {
    res.render('celebrities/new-celebrity')
  }
})

//Iteration #4: Listing Our Celebrities
router.get('/', async (req, res, next) => {
  try {
    const listCelebrities = await Celebrity.find()
    res.render('celebrities/celebrities', {
      allCelebrities: listCelebrities,
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const celebrity = await Celebrity.findById(req.params.id)
    const relatedMovie = await Movie.find({ celebrity: req.params.id })
    res.render('celebrities/one-celebrity', { celebrity, relatedMovie })
    //res.send({ celebrity, relatedMovie })
  } catch (error) {
    next(error)
  }
})

module.exports = router
