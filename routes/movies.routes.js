const router = require('express').Router()
const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')

//Iteration #6: Adding New Movies
router.get('/create', async (req, res, next) => {
  try {
    const listCelebrities = await Celebrity.find()
    res.render('movies/new-movie', {
      celebrities: listCelebrities,
    })
  } catch (error) {
    next(error)
  }
})

router.post('/create', async (req, res, next) => {
  // console.log(req.body)
  const { title } = req.body
  if (title === '') {
    return res.render('movies/new-movies', {
      errorMessage: 'You need a name in order to create a Movie',
    })
  }
  //res.send(req.body)
  try {
    //await Movie.deleteMany()
    const { title, genre, plot, cast } = req.body
    const createdMovie = await Movie.create({
      title,
      genre,
      plot,
      cast,
    })
    console.log(createdMovie)
    res.redirect('/movies') //redirectの場合はURLになる
  } catch (error) {
    res.render('movies/new-movie')
  }
})

//Iteration #7: Listing Our Movies
// I cannot get the name of cast (only id)
router.get('/', async (req, res, next) => {
  try {
    const listMovies = await Movie.find()
    res.render('movies/movies', {
      allMovies: listMovies,
    })
  } catch (error) {
    next(error)
  }
})

//Iteration #8: The Movie Details Page
// I don't know why the name & occupation... x 3 times display
router.get('/:id', async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('cast')
    res.render('movies/movie-details', { movie })
  } catch (error) {
    next(error)
  }
})

//Iteration #9: Deleting Movies
router.post('/:id/delete', async (req, res, next) => {
  try {
    await Movie.findByIdAndDelete(req.params.id)
    const allCelebrities = await Celebrity.find({ movie: req.params.id })
    for (const celebrity of allCelebrities) {
      celebrity.movie = null
      await celebrity.save()
    }
    res.redirect('/movies')
  } catch (error) {
    next(error)
  }
})

//Iteration #10: Editing Movies
router.get('/:id/edit', async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find()
    const movieToUpdate = await Movie.findById(req.params.id)
    res.render('movies/edit-movie', { celebrities, movie: movieToUpdate })
  } catch (error) {
    next(error)
  }
})

router.post('/:id/edit', async (req, res, next) => {
  console.log(req.body)
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    console.log(updatedMovie)
    res.redirect('/movies')
  } catch (error) {
    next(error)
  }
})

module.exports = router
