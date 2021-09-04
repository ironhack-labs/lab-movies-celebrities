const router = require("express").Router();

const Movie = require("./../models/Movie.model")
const Celebrity = require("./../models/Celebrity.model");


//formulario para crear a las movies
router.get("/create", (req, res)=> res.render('movies/new-movie'))
router.post("/create", (req, res)=> {
  const { title, genre, plot, cast } = req.body

  Movie
    .create({ title, genre, plot, cast })
    .then(() => {
       res.redirect(`/movies`)})
    .catch(err => console.log(err))

})

//listado de movies
router.get("/", (req, res)=> {

  Movie
    .find()
    .select('title', 'cast')
    .populate('cast')
    .then(movies => res.render('./movies/movies', { movies }))
    .catch(err => console.log(err))
})

// router.get('/hola', (req, res) => {
//     res.send('hakdfshkdshafl')
// })



module.exports = router;