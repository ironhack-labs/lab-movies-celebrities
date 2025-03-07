const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// GET /movies - Display all movies
router.get("/", (req, res, next) => {
  Movie.find()
    .populate('cast')
    .then(movies => {
      res.render("movies/movies", { movies, title: "Movie List" });
    })
    .catch(err => {
      console.error("Error retrieving movies:", err);
      next(err);
    });
});

// GET /movies/create - Display form to create a movie
router.get("/create", (req, res, next) => {
  Celebrity.find()
    .then(celebrities => {
      res.render("movies/new-movie", { 
        celebrities,
        title: "Add New Movie"
      });
    })
    .catch(err => {
      console.error("Error retrieving celebrities:", err);
      next(err);
    });
});

// POST /movies/create - Handle form submission to create a movie
router.post("/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  
  Movie.create({ title, genre, plot, cast })
    .then(() => {
      res.redirect("/movies");
    })
    .catch(err => {
      console.error("Error creating movie:", err);
      next(err);
    });
});
// GET /movies/:id - Display movie details
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  
  Movie.findById(id)
    .populate('cast')
    .then(movie => {
      if (!movie) {
        return res.status(404).render("error", { 
          message: "Movie not found",
          title: "Error" 
        });
      }
      
      res.render("movies/movie-details", { 
        movie, 
        title: movie.title 
      });
    })
    .catch(err => {
      console.error("Error retrieving movie details:", err);
      next(err);
    });
});
// GET /movies/:id/edit - Display edit form for a movie
router.get("/:id/edit", (req, res, next) => {
  const { id } = req.params;
  
  Promise.all([
    Movie.findById(id).populate('cast'),
    Celebrity.find()
  ])
    .then(([movie, celebrities]) => {
      if (!movie) {
        return res.status(404).render("error", { 
          message: "Movie not found",
          title: "Error" 
        });
      }
      
      // Convert cast array to strings for comparison
      const castIds = movie.cast.map(celeb => celeb._id.toString());
      
      res.render("movies/edit-movie", { 
        movie, 
        celebrities,
        castIds,
        title: `Edit ${movie.title}` 
      });
    })
    .catch(err => {
      console.error("Error retrieving movie and celebrities:", err);
      next(err);
    });
});

// POST /movies/:id/edit - Handle form submission to update a movie
router.post("/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { title, genre, plot, cast } = req.body;
  
  Movie.findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true })
    .then(updatedMovie => {
      if (!updatedMovie) {
        return res.status(404).render("error", { 
          message: "Movie not found",
          title: "Error" 
        });
      }
      
      res.redirect(`/movies/${updatedMovie._id}`);
    })
    .catch(err => {
      console.error("Error updating movie:", err);
      next(err);
    });
});

// POST /movies/:id/delete - Handle movie deletion
router.post("/:id/delete", (req, res, next) => {
  const { id } = req.params;
  
  Movie.findByIdAndDelete(id)
    .then(deletedMovie => {
      if (!deletedMovie) {
        return res.status(404).render("error", { 
          message: "Movie not found",
          title: "Error" 
        });
      }
      
      res.redirect("/movies");
    })
    .catch(err => {
      console.error("Error deleting movie:", err);
      next(err);
    });
});

module.exports = router; 