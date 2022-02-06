
const router = require("express").Router();

module.exports = router;


const movies= require('../models/Movies.model')
const celebrities= require('../models/Celebrity.model')


//crear pelis 
router.get('/create', (req, res, next) => {
    celebrities.find()                                  
    .then((celebs) => res.render('movies/new-movie', {celebs}))
    .catch((err) => console.log (err))
})

router.post('/create', (req, res) => {
  const { title, genre, plot, cast } = req.body

  movies.create({title, genre, plot, cast  })
    .then(res.redirect('/movies'))
    .catch((err) => console.log(err))
})

// LISTA pelis
router.get('/', (req, res, next) => {
  movies.find()
    .then((movies) => {
      res.render('movies/movies', { movies})
    })
    .catch((err) => console.log(err))
})

// detalles peli    // con :id para que sea dinamico  findById para coger los detalles de la pili por us id y hay que usar populate en el cast 



router.get("/details/:id", (req, res, next) => {
  const { id } = req.params;

  movies.findById(id)
    .populate("cast")
    .then((movies) => {
      res.render("movies/movie-details", movies);
    })
    .catch((err) => console.log(err));
});




//borrar
// router.post('/:id/delete', (req, res) => {
//     const { id } = req.params;
  
//     movies.findByIdAndDelete(id)
//     .then(()=> res.redirect('/movies'))
//     .catch((err) => console.log(err))
// })
