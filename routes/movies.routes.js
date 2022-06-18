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

router.get("/movies/:id", (req, res, next) => {
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

router.post("/movies/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Movies.findByIdAndDelete(id)
    .then(() => {
      console.log("movie deleted successfully");
      res.redirect("/movies/movies");
    })
    .catch((err) => {
      console.log("error deleting movies", err);
      next();
    });
});

//movie editing

//get route

router.get("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;

  Movies.findById(id)
    .populate("_cast")
    .then((movie) => {
      //console.log("details of the movie for editing", movie);

      Celebrity.find()
        .then((celebrities) => {
          //console.log("las celebridades: ", celebrities);
          res.render("movies/edit-movie", {
            data: { movie: movie, celebrities: celebrities },
          });
        })
        .catch((err) => {
          console.log("error editing movie", err);
          next();
        });
    })
    .catch((err) => {
      console.log("error editing movie", err);
      next();
    });
});

//post route

router.post("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;

  const { title, genre, plot, _cast } = req.body;

  Movies.findByIdAndUpdate(id, { title, genre, plot }, { new: true }).then(
    (updatedMovie) => {
      updatedMovie._cast.push(_cast);
      updatedMovie.save();

      Celebrity.findById(_cast)
        .then((actor) => {
          console.log("la info-->", actor.moviePlayed[0], updatedMovie._id); //son lo mismo

          if (actor.moviePlayed[0] === updatedMovie._id) { //no se porque no funciona
            return res.send("no se puede agregar al actor esta película");
          } else if (actor.moviePlayed[0] !== updatedMovie._id) {
            actor.moviePlayed.push(updatedMovie._id);
            actor.save();
            res.redirect("/movies/movies");
            console.log("actor, :", actor);
          }
        })

        .catch((err) => {
          console.log("error updating movie", err);
          next();
        });
    }
  );
});

module.exports = router;
