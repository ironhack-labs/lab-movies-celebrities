// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/movies.model');

router.get("/movies/create", async (req, res, next) => {

    try {

        const celebreties = await Celebrity.find();
        res.render("movies/new-movie.hbs", {celebreties});

    } catch (error) {

        console.error(error);
        res.status(500).send("Something went wrong");
    }

});

router.post("/movies/create", async (req, res) => {


    try {
        const { title, genre, plot, cast } = req.body;

        const newMovie = new Movie({

            title,
            genre,
            plot,
            cast,
        });

        await newMovie.save();

        res.redirect("/movies");
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }

});

router.get("/movies", async (req, res) => {

    try {

        const movies = await Movie.find();

        res.render("movies/movies", { movies });
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong");

    }
});

router.get('/movies/:id', async (req, res) => {
    try {
      const movieId = req.params.id;
      const movie = await Movie.findById(movieId).populate('cast');
      if (!movie) {
        return res.status(404).send('Movie not found');
      }
      res.render('movies/movie-details', { movie });
    } catch (error) {
      console.error(error);
      res.status(500).send('Here is the error');
    }
  });

  router.post('/movies/:id/delete', async (req, res) => {
    try {
      const movieId = req.params.id;
      
      await Movie.findByIdAndRemove(movieId);
   
      res.redirect('/movies');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });



  router.post('/movies/:id/edit', async (req, res) => {
    try {
      const movieId = req.params.id;
      const { title, genre, plot, cast } = req.body;
  
      // Validate celebrity IDs in the cast array
      const isValidCelebrities = cast.every(celebrityId => mongoose.Types.ObjectId.isValid(celebrityId));
      if (!isValidCelebrities) {
        return res.status(400).send('Invalid celebrity ID(s) provided.');
      }
  
      // Update the movie document with the new details
      const updatedMovie = await Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast }, { new: true });
  
      if (!updatedMovie) {
        return res.status(404).send('Movie not found.');
      }
  
      res.redirect(`/movies/${movieId}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  router.get('/movies/:id/edit', async (req, res) => {
    try {
      const movieId = req.params.id;
      const movie = await Movie.findById(movieId);
      if (!movie) {
        return res.status(404).send('Movie not found');
      }
      const celebrities = await Celebrity.find();
      res.render('movies/edit-movie', { movie, celebrities });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });


module.exports = router;