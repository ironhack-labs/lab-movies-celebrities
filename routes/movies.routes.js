const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

// Render the create movie form
router.get('/create', (req, res) => {
  Celebrity.find()
    .then((celebrities) => res.render('movies/new-movie', { celebrities }))
    .catch((err) => console.error(err));
});

// Handle form submission
router.post('/create', (req, res) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect('/movies'))
    .catch(() => res.render('movies/new-movie'));
});

router.get('/', (req, res) => {
    Movie.find()
      .then((movies) => res.render('movies/movies', { movies }))
      .catch((err) => console.error(err));
  });
  
  router.get('/:id', (req, res) => {
    Movie.findById(req.params.id)
      .populate('cast')
      .then((movie) => res.render('movies/movie-details', { movie }))
      .catch((err) => console.error(err));
  });

  // Delete a movie
router.post("/:id/delete", async (req, res, next) => {
    const { id } = req.params;
    try {
      await Movie.findByIdAndDelete(id);
      res.redirect("/movies"); // Redirect to the movies list after deletion
    } catch (error) {
      console.error("Error deleting the movie:", error);
      next(error);
    }
  });

  // Display the edit form
router.get("/:id/edit", async (req, res, next) => {
    const { id } = req.params;
    try {
      const movie = await Movie.findById(id);
      res.render("movies/edit-movie", { movie });
    } catch (error) {
      console.error("Error loading the movie for editing:", error);
      next(error);
    }
  });
  
  // Handle the edit form submission
  router.post("/:id/edit", async (req, res, next) => {
    const { id } = req.params;
    const { title, genre, plot } = req.body;
    try {
      await Movie.findByIdAndUpdate(id, { title, genre, plot });
      res.redirect("/movies"); // Redirect to the movies list after editing
    } catch (error) {
      console.error("Error updating the movie:", error);
      next(error);
    }
  });
  
  module.exports = router;  