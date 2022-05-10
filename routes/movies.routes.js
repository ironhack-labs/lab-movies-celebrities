// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/movie/create", (req, res, next) => 
    Celebrity.find({})
    .then((celebrities) => res.render("movies/new-movie", {celebrities}))
    );


router.post("/movie/create", (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    Movie.create({ title, genre, plot, cast })
      .then(() => {
          res.redirect('/movies');
      })
      .catch((err) => res.redirect('/movie/create'));
  });

  router.get('/movies', (req, res, next) => {
    Movie.find({})
      .then((movies) => {
        res.render('movies/movies', { movies });
      })
      .catch((err) => next(err));
  });

//Edit

router.get('/movies/:id/edit', (req, res, next) => {
    const { id } = req.params;
    Movie.findById(id)
      .then((movie) => 
        Celebrity.find({})
        .then((celebrities) => res.render('movies/edit-movie', {celebrities, movie}))
    
      )
      .catch((err) => next(err));
  });

router.post('/movies/:id/edit', (req, res, next) => {
    const { id } = req.params;
    const { title, genre, plot, cast } = req.body;
  
    Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
      .then((movie) => res.redirect(`/movies/${movie._id}`))
      .catch((err) => next(err));
  });
  


//Delete
  router.post('/movies/:id/delete', (req, res, next) => {
    const { id } = req.params;
    Movie.findByIdAndRemove(id)
      .then(() => res.redirect('/movies'))
      .catch((err) => next(err));
  });


  //Details route
  router.get('/movies/:id', (req, res, next) => {
    const { id } = req.params;
    Movie.findById(id)
    .populate('cast')
      .then((movie) => {
        res.render('movies/movie-details', movie);
      })
      .catch((err) => next(err));
  });




module.exports = router;