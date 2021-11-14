// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")
const Movie = require("../models/Movie.model")

// all your routes here

router.get('/movies/create', (req, res, next) => {

Celebrity.find()
    .then(allCelebrities => {
      console.log(allCelebrities)
      res.render("movies/new-movie",  {allCelebrities} )
    })
    .catch(err => console.log(err))

})

router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body

    const newMovie = new Movie ({ title, genre, plot, cast })
    newMovie.save()
    .then((movieCreated) => {
      console.log(movieCreated) 
      res.redirect('/movies');
    })
    .catch((error) => {
      console.log("-----------------------> Al crear una peli hay un error", error)
      res.render('movies/new-movie');
    })
});


router.get('/movies', (req, res, next) => {

  Movie.find()
  .populate("Celebrity")
  .then(allMovies => {
    console.log(allMovies) 
    res.render('movies/movies', { allMovies });
  })
  
  .catch((error) => {
    console.log("-----------------------> Hay un pedazo de error al mostrar las movies", error)
    res.render('movies/movies');
  })
    
})

router.get('/movies/:id', (req, res, next) => {

  const { id } = req.params;

  Movie.findById(id)
  .populate("Celebrity")
  .then(movieDetails => {
    console.log(movieDetails) 
    res.render('movies/movie-details', { movieDetails });
  })
  
  .catch((error) => {
    console.log("-----------------------> Hay un pedazo de error al mostrar las movies", error)
    res.render('movies/movies');
  })
    
})

router.post('/movies/:id/delete', (req, res, next) => {

  const { id } = req.params;

  Movie.findByIdAndDelete(id)
  .then(movieDelete => {
    console.log(movieDelete) 
    res.redirect('/movies');;
  })

  
  .catch((error) => {
    console.log("-----------------------> Hay un pedazo de error al eliminar una movie", error)
    res.render('movies/movie-details');
  })

    
})

router.get('/movies/:id/edit', (req, res, next) => {

  const { id } = req.params;

  Movie.findById(id)
  .populate("Celebrity")
  .then(movieEdit => {
    console.log("aqui estoy llegando a la pagina de editar y a su objeto :", movieEdit) 
    res.render('movies/edit-movie', { movieEdit });
  })
  
  .catch((error) => {
    console.log("-----------------------> Hay un pedazo de error al mostrar las movies", error)
    res.render('movies/edit-movie');
  })
    
})

router.post('/movies/:id', (req, res, next) => {

  const { id } = req.params;
  const { title, genre, plot, cast } = req.body 

  console.log("estos son mi req.body:", title, genre, plot, cast)

  Movie.findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true })
  .populate("Celebrity")
  .then(movieUpdate => {
    console.log("supuestamente estoy editando", movieUpdate) 
    res.redirect('/movies/:id');
  })
  
  .catch((error) => {
    console.log("-----------------------> Hay un pedazo de error al eliminar una movie", error)
    res.render('movies/movie-details');
  })

    
})





module.exports = router;
