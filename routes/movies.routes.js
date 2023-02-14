// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model")
// all your routes here



//Create Movie GET
router.get('/movies/create', async (req, res, next) => {

    try {
        const celebrities = await Celebrity.find()
        res.render('movies/new-movie', {celebrities} );
    } catch (error) {
        next(error)
    }
    
})




// Create Movie POST
router.post('/movies/create', async (req, res, next) => {
    try {
      const { title, genre, plot, cast} = req.body
      
      
      await Movie.create({ title, genre, plot, cast})
      
      
      res.redirect('/movies');

    } catch (error) {
      console.log(error);
      next(error);
    }
  });



//All Movies
router.get('/movies', async (req, res, next) => {
    try {
       
      let movies = await Movie.find();
      //render the view with the information
      res.render('movies/movies', { movies });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });


//Delete Movies


router.post('/movies/:id/delete', async (req, res, next) => {
  
    try {
      const { id } = req.params;
  
      await Movie.findByIdAndRemove(id);
  
      res.redirect('/movies');
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

//Edit Movies

router.get("/movies/:id/edit", async (req, res, next) => {
    try {
      const { id } = req.params;
      const movies = await Movies.findById(id);

    const celebrities = await Celebrities.find();



      res.render("movies/edit-movie", {movies, celebrities});
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  router.post("/movies/:id/edit", async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, genre, plot, cast } = req.body

      await Movies.findByIdAndUpdate(id, { title, genre, plot, cast });

      res.redirect(`/movies/${id}`);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });



//Movies Details

router.get('/movies/:id', async (req, res, next) => {
    try {

      const { id } = req.params;
      
      const movie = await Movie.findById(id).populate('cast'); // I can't populate

      const celebrities = await Celebrity.find()
      
      res.render('movies/movie-details', {movie, celebrities});
      
    } catch (error) {
      console.log(error);
      next(error);
    }
  });



module.exports = router;