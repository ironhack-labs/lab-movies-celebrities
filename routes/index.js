const router = require("express").Router();
// const movies = require('./movies.routes')
// const celebrities = require('./celebrities.routes')
const Celebrity = require('./../models/Celebrity.model');
const Movie = require('./../models/Movie.model')



/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//router.get('/celebrities/create', celebrities.celebrity_create)


//CELEBRITIES

router.get("/celebrities/index", (req, res, next) => {
  res.render("celebrities/indexCele");
});

//Render create
router.get('/celebrities/create', (req, res) => res.render('celebrities/new-celebrity'))

// //res.send(console.log('holi'))

//Create celebrity
router.post('/celebrities/create', (req, res) => {

  const { name, occupation, catchPhrase } = req.body

  Celebrity
    .create({ name, occupation, catchPhrase })
    .then(() => res.redirect('/celebrities'))
    .catch(err => console.log(err))
})

//List celebrities
router.get('/celebrities', (req, res) => {
  Celebrity
    .find()
    .then(celebrities => res.render('celebrities/celebrities', { celebrities }))
    .catch(err => console.log(err))
})

//MOVIES

router.get("/movies/index", (req, res, next) => {
  res.render("movies/indexMovie");
});
//Render create Movie

//res.send(console.log('holi'))
router.get('/movies/create', (req, res) => {

  Celebrity
    .find()
    .then(celebrities => res.render('movies/new-movie', { celebrities }))
    .catch(err => console.log(err))
})

//Create Movie
router.post('/movies/create', (req, res) => {

  const { title, genre, plot, cast } = req.body

  Movie
    .create({ title, genre, plot, cast })
    .then(() => res.redirect('/movies'))
    .catch(err => console.log(err))
})


//List celebrities
router.get('/movies', (req, res) => {
  Movie
    .find()
    .then(movies => res.render('movies/movies', { movies }))
    .catch(err => console.log(err))
})

//Movie details
router.get('/movies/:id', (req, res) => {

  const { id } = req.params
  //console.log('esto traigo', id)

  Movie
    .findById(id)
    .populate('cast')
    .then(movie => res.render('movies/movie-details', movie))
    .catch(err => console.log(err))
})

//Movie Delete
router.post('/movies/:id/delete', (req, res) => {

  const { id } = req.params
  //console.log('esto traigo', id)

  Movie
    .findByIdAndRemove(id)
    .then(() => res.redirect('/movies'))
    .catch(err => console.log(err))
})


// Edit Movie form: render
router.get('/movies/:id/edit', (req, res) => {

  const { id } = req.query

  Movie
    .findById(id)
    .then(themovie => res.render('movies/edit-movie', themovie))
    .catch(err => console.log(err))
})

// Edit Movie form: manage
router.post('/movies/:id', (req, res) => {

  const { id } = req.query
  const { title, genre, plot, cast } = req.body

  Book
    .findByIdAndUpdate(id, { title, genre, plot, cast })
    .then(() => res.redirect('/movies'))
    .catch(err => console.log(err))
})



module.exports = router;
