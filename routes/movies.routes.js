const router = require("express").Router();
const Movies = require("../models/Movies.model");
const Celebrity = require("../models/Celebrity.model");

//Create movies
router.get("/create", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      console.log("las celebridades: ", celebrities);
      res.render("movies/new-movie", { celebrities });
    })
    .catch((err) => {
      console.log("error creating movie", err);
      next();
    });
});

router.post("/create", (req, res, next) => {
  const movies = req.body; // con el req.body necesitas pasarlo así.
  Movies.create(movies)
    .then((movie) => {


      Celebrity.findById(movie._cast[0])
        .then((actor) => {
          /*         console.log("si lo ubica",actor)
        console.log("lo que voy a pushear",movie._id)
        console.log("length",actor.moviePlayed.length) */
          actor.moviePlayed.push(movie._id);
          actor.save();
          /* console.log("length despues de pushear",actor.moviePlayed.length) */

          /*    console.log("create success", movies); */
          res.redirect("/movies/movies");
        })

        .catch((err) => {
          console.log("error creating movie", err);
          next();
        });
    })
    .catch((err) => {
      console.log("error creating movie", err);
      next();
    });
});

//list movies

router.get("/movies", (req, res) => {
  Movies.find()
    .populate("_cast")
    .then((movies) => {
      console.log("all the movies", movies);
      res.render("movies/movies", { movies: movies });
    })
    .catch((err) => {
      console.log("error getting movies", err);
      next();
    });
});

//movie detail

router.get("/movies/:id", (req, res,next) => {
  const { id } = req.params;
  Movies.findById(id)
    .populate("_cast")
    .then((movie) => {
      console.log("details of the movie", movie);
      res.render("movies/movie-details", movie);
    })
    .catch((err) => {
      console.log("error getting movies", err);
      next();
    });
});

//movie detele:

router.post('/movies/:id/delete',(req, res,next) => {
  const { id } = req.params;
  Movies.findByIdAndDelete(id)
  .then(() => {
    console.log("movie deleted successfully")
res.redirect("/movies/movies")
  })
.catch((err) => {console.log("error deleting movies", err);
next();})
})

module.exports = router;
