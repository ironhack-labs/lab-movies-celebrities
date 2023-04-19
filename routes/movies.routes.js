// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/create", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDb) => {
      res.render("movies/new-movie", { allCelebrities: celebritiesFromDb });
    })
    .catch((err) => {
      console.log("erreur", err);
      next(err);
    });
});

router.post("/create", (req, res, next) => {
  const movies = req.body;
  Movie.create({
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  })
    .then((celebrityFromDB) => {
      res.redirect("/movies");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/", (req, res, next) => {
  Movie.find()
    .then((moviesFromDB) => {
      console.log("All the movies", moviesFromDB);
      res.render("movies/movies", { allMovies: moviesFromDB });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", (req, res, next) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((movieFromDb) => {
      console.log("All the movies", movieFromDb);
      res.render("movies/movie-details", {
        oneMovie: movieFromDb,
      });
    })
    .catch((err) => {
      console.log("erreur", err);
      next(err);
    });
});

router.post("/:id/delete", (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => next(err));
});

router.get("/:id/edit", (req, res, next) => {
  const p1 = Movie.findById(req.params.id); // movieFromDB
  const p2 = Celebrity.find(); //celebritiesFromDB
  Promise.all([p1, p2])
    .then((values) => {
      const movieFromDB = values[0];
      const celebritiesFromDB = values[1];

      // celebritiesFromDB.forEach((celebrity) => {
      //   if (movieFromDB.cast.includes(celebrity._id)) {
      //     celebrity.selected = true;
      //   } else {
      //     celebrity.selected = false;
      //   }
      // });

      res.render("movies/edit-movie", {
        movie: movieFromDB,
        celebrities: celebritiesFromDB, // [ {id: , name: , etc...}, {}]
      });
    })
    .catch((err) => next(err));
});

router.post("/:id/edit", (req, res, next) => {
  

  Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(() => {
      console.log("yoooooo");
      res.redirect(`/movies/${req.params.id}`);
    })
    .catch((err) => next(err));
});

module.exports = router;
