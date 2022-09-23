// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model")

const Celebrity = require("../models/Celebrity.model")


/* GET home page */
router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
        .then(celebrityList => {
          console.log(celebrityList);
          res.render("movies/new-movie", {celebrityList});
        })
        .catch(err => {
          console.log(err);
        });
    
});



router.post("/movies/create", (req,res,next) => {
    console.log(req.body);
    const movieTitle = req.body.title;
    const movieGenre = req.body.genre;
    const moviePlot = req.body.plot;
    const movieCast = req.body.cast;

    Movie.create({
      title: movieTitle,
      genre: movieGenre,
      plot: moviePlot,
      cast: movieCast
    })
      .then(savedMovie => {
        console.log(savedMovie);
        res.send('Movie was saved!');
      })
      .catch(err => {
        console.log(err);
        res.render("movies/new-movie");
      })
  });
  



  router.get("/movies", (req, res, next) => {
    Movie.find()
        .then(movieList => {
          console.log(movieList);
          res.render('movies/movies', {movieList});
        })
        .catch(err => {
          console.log(err);
        })
  });



  router.get("/movies/:id", (req, res, next) => {
    const {id} = req.params;

    Movie.findById(id).populate('cast')
        .then(movieSpecific => {
            console.log(movieSpecific);
            res.render('movies/movie-details', {movieSpecific});
        })
        .catch(err => {
          console.log(err);
        })
  });


  router.post("/movies/:id/delete", (req, res, next) => {
    const { id } = req.params;

    Movie.findByIdAndDelete(id)
        .then( (newList) => {
            console.log(newList);
            res.redirect('/movies');
        })
        .catch(err => {
          console.log(err);
        })
  });


  router.get("/movies/:id/edit", (req, res, next) => {
    const { id } = req.params;


    Movie.findById(id)
        .then(newList => {
          Celebrity.find()
          .then(celebrityList => {
            console.log(newList);
            res.render('movies/edit-movie', {newList: newList,
              celebrityList: celebrityList} );
          })
            
        })
        .catch(err => {
          console.log(err);
        })
  });

  router.post("/movies/:id/edit", (req, res, next) => {
    const {id} = req.params;

    console.log(id)

    console.log(req.body);
    const movieTitle = req.body.title;
    const movieGenre = req.body.genre;
    const moviePlot = req.body.plot;
    const movieCast = req.body.cast;

    Movie.findByIdAndUpdate(id, {
      title: movieTitle,
      genre: movieGenre,
      plot: moviePlot,
      cast: movieCast
    })
      .then(updatedMovie => {
        console.log(updatedMovie);
        res.redirect(`/movies/${id}`);
      })
      .catch(err => {
        console.log(err);
        res.redirect(`/movies/${id}/edit`);
      })
  });





  

module.exports = router;
