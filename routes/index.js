const router = require("express").Router();
require('./celibrities.routes')
require('./movies.routes')
const Celebrity = require('./../models/Celebrity.model')
const Movie = require('./../models/Movie.model')

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});
//CELEBRITIES.ROUTE
router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
})

router.post("/celebrities/create", (req, res, next) => {

  const { name, occupation, catchPhrase } = req.body

  Celebrity

    .create({ name, occupation, catchPhrase })
    .then(() => res.redirect('celebrities',))
    .catch(() => res.render('new-celebrity'))

})
router.get("/celebrities/celebrities", (req, res, next) => {
  // res.send('hola')

  Celebrity
    .find()
    .then(celebrities => res.render('celebrities/celebrities', { celebrities }))
    .catch(err => console.log(err))

})

// MOVIES.ROUTE
router.get("/movies/create", (req, res, next) => {

  Celebrity
    .find()
    .then(celebrities => res.render('movies/new-movie', { celebrities }))
    .catch(err => console.log(err))
})

router.post("/movies/create", (req, res, next) => {

  const { title, genre, plot, cast } = req.body

  Movie
    .create({ title, genre, plot, cast })
    .then(() => res.redirect('movies'))
    .catch(() => res.render('movies/new-movie'))
})
router.get("/movies/movies", (req, res, next) => {
  // res.send('hola')

  Movie
    .find()
    .then(movies => res.render('movies/movies', { movies }))
    .catch(err => console.log(err))
})

router.get("/movies/movies/:id", (req, res, next) => {
  // res.send('hola')
  const { id } = req.params
  Movie
    .findById(id)
    .populate('cast')
    .then(movie => res.render('movies/movie-details', movie))
    .catch(err => console.log(err))
})
router.post("movies/movies/:id/delete", (req, res, next) => {

  const { id } = req.params
  Movie
    .findByIdAndRemove(id)
    .then(() => res.redirect('movies/movies'))
    .catch(err => console.log(err))
})
router.get("/movies/movies/:id", (req, res, next) => {
  // res.send('hola')
  const { id } = req.params
  Movie
    .findById(id)


  Celebrity
    .find()
    .then(movies => res.render('movies/edit-movie', { movies }))
    .catch(err => console.log(err))


})



module.exports = router;
