// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie");

// get all movies
router.get("/movies", (req, res) => {
  // console.log("sending router");
  // res.send("hello from movies route!");
  Movie.find()
    .then((allMovies) => {
      // console.log(allMovies);
      res.render("movies/movies", { allMovies });
    })
    .catch((err) => next(err));
});

// render create new movie page
router.get("/movies/create", (req, res, next) => {
  res
    .render("movies/new-movie")
    .then((data) => console.log(data))
    .catch((err) => next(err));
});

//render movie details page
router.get("/movies/:id", (req, res, next) => {
  const movieId = req.params.id;
  Movie.findById(movieId)
    .then((moviesFromDB) => {
      console.log(moviesFromDB);
      res.render("movies/movie-details", { movie: moviesFromDB });
    })
    .catch((err) => next(err));
});

// submit new movie
router.post("/movies", (req, res, next) => {
  const { title, genre, plot } = req.body;
  Movie.create({ title, genre, plot })
    .then((newMovie) => {
      console.log(newMovie);
      res.redirect(`/movies/${newMovie._id}`);
    })
    .catch((err) => next(err));
});

// render edit movie page
router.get("/movies/edit/:id", (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      // console.log(movie);
      res.render("movies/edit-movie", { movie });
    })
    .catch((err) => next(err));
});

//submit edited movie
router.post("/movies/edit/:id", (req, res, next) => {
  const { title, genre, plot } = req.body;
  Movie.findByIdAndUpdate(
    req.params.id,
    {
      title,
      genre,
      plot,
    },
    { new: true }
  )
    .then((data) => {
      console.log("MOVIE UPDATED SUCCESSFULLY!");
      console.log(data);
      // res.send("editing movie!");
      res.redirect(`/movies/${req.params.id}`);
    })
    .catch((err) => {
      console.log("oh no error in editing!");
      console.log(err);
    });
});

// delete movie
router.get("/movies/delete/:id", (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(() => {
      console.log("MOVIE WAS DELETED!!!");
      res.redirect("/movies");
    })
    .catch((err) => next(err));
});

module.exports = router;

//delete book
// router.get("/books/delete/:id", (req, res, next) => {
//   Book.findByIdAndDelete(req.params.id)
//     .then(() => {
//       res.redirect("/books");
//     })
//     .catch((err) => next(err));
// });
