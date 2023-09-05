const router = require("express").Router();

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/movies/create", (req, res, next) => {
    // const { title, genre, plot, cast } = req.body;

    Celebrity.find()
    .then ((celebrities) => {
      res.render("movies/new-movies", {celebrities});
    })     
  .catch((err) => {
    console.log(err);
    next(err);
  });
   });

   router.post("/movies/create", (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    Movie.create({ title, genre, plot, cast }) // or Post.create({req.body})
    .then((Createdcelebrities) =>  {
      console.log(Createdcelebrities);
      res.redirect('/movies')
    })
      .catch ( (err) => 
        res.render("movies/new-movie"));
    })


    router.get('/movies', (req, res, next) => {
      Movie.find()
        .then(moviesFromDb => {
          res.render('movies/movies', {moviesFromDb});
        })
        .catch(err => {
          console.log(`Err while getting the movies from the DB: ${err}`);
          next(err);
        });
    });
  

    router.get('/movies/:movieId', (req, res, next) => {
      const { movieId } = req.params;
     
      Movie.findById(movieId)
        .populate('cast')
        .then(foundMovie => res.render('movies/movie-details', {movie:foundMovie}))
        .catch(err => {
          console.log(`Err while getting a single movie from the DB: ${err}`);
          next(err);
        });
    });


    router.post('/movies/:movieId/delete', (req, res, next) => {
      const { movieId } = req.params;
     
      Movie.findByIdAndDelete(movieId)
        .then(() => res.redirect('/movies'))
        .catch(error => next(error));
    });



    router.get('/movies/:movieId/edit', (req, res, next) => {
      const { movieId } = req.params;
     
      Movie.findById(movieId)
        .populate('cast')
        .then(movietoEdit => {
          Celebrity.find()
          .then((celebrities) => {
            res.render('movies/edit-movie',{movie: movietoEdit, celebrities});
          })
          
        })
        .catch(error => next(error));
    });


  router.post('/movies/:movieId/edit', (req, res, next) => {
      const { movieId } = req.params;
      const { title, genre, plot, cast } = req.body;
     
      Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast }, { new: true })
        .then(updatedMovie => res.redirect(`/movies/${updatedMovie.id}`))
        .catch(error => next(error));
    });
module.exports = router;
