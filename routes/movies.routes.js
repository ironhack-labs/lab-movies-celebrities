// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// all your routes here

// ***** CREATE ROUTES *****

// GET '/movies/create' route to show movie creation form to the user
router.get("/create", (req, res, next) => {
    // to render the create form we fetch all celebrities from the DB, so we can make the user select which celebrities will be in the cast of the movie
    Celebrity.find()
      .then((allCelebrities) =>
        res.render("movies/new-movie.hbs", { allCelebrities })
      )
      .catch((err) => next(err));
  });


  // POST '/movies/create' route to create a new movie in the DB
router.post("/create", (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
  
    Movie.create({ title, genre, plot, cast })
      .then(() => res.redirect("/movies"))
      .catch((err) => res.render("movies/new-movie.hbs"));
  });


  

  // ***** READ ROUTES *****

// GET '/movies' route to show all movies in a list
router.get("/", (req, res, next) => {
    Movie.find()
      .then((allMovies) => res.render("movies/movies.hbs", { allMovies }))
      .catch((err) => next(err));
  });
  
  // GET '/movies/:id' route to show details of a specific movie
  router.get("/:id", (req, res, next) => {
    const { id } = req.params;
  
    // when finding the Movie with all its attributes we will also `populate` the cast attribute. So instead of the value being the ID of the Celebrty, it will be all the Celebrity data
    Movie.findById(id)
      .populate("cast")
      .then((oneMovie) => res.render("movies/movie-details.hbs", { oneMovie }))
      .catch((err) => next(err));
  });

  

  // ***** UPDATE ROUTES *****
  
  // GET '/movies/:id/edit' route to show the movie edit form to the user
  router.get("/:id/edit", (req, res, next) => {
    const { id } = req.params;
  
    Movie.findById(id)
      .then((oneMovie) => {
        // before rendering the edit form with the Movie info, we make a second mongoose call to get also all celebrities.
        Celebrity.find()
          .then((allCelebrities) => {
            // rendering the edit form with both data
            res.render("movies/edit-movie.hbs", { oneMovie, allCelebrities });
          })
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });
  
  // POST '/movies/:id/edit' route to edit the movie
  router.post("/:id/edit", (req, res, next) => {
    const { id } = req.params;
    const { title, genre, plot, cast } = req.body;
  
    Movie.findByIdAndUpdate(id, { title, genre, plot, cast })
      .then(() => res.redirect(`/movies/${id}`))
      .catch((err) => next(err));
  });


  
  // ***** DELETE ROUTES *****
  
  // POST '/movies/:id/delete' route to delete a single movie
  router.post("/:id/delete", (req, res, next) => {
    const { id } = req.params;
  
    Movie.findByIdAndRemove(id)
      .then(() => res.redirect("/movies"))
      .catch((err) => next(err));
  });
  
  

module.exports = router;