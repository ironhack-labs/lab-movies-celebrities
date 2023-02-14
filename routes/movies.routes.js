// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
const Movies = require("../models/movie.model");

    const Celebrities = require('../models/Celebrity.model')

//now, we need to create the movies:
router.get("/movies/create", async (req, res, next) => {
    try {
        let celebrities = await Celebrities.find()

        res.render("movies/new-movie", {celebrities});

    } catch (error) {
        console.log(error);
        next(error);
    }
  });

  //now, we have to send this info to the front-end
router.post("/movies/create", async (req, res, next) => {
    try {
      const { title, genre, plot, cast } = req.body;
  
      await Movies.create({ title, genre, plot, cast });
  
      res.redirect("/movies/create");

    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  router.get("/movies", async (req, res, next) => {
    try {
      let movies = await Movies.find();
  
      res.render("movies/movies", { movies }); //-> we send it to the destination /celebrities and render the 
    } catch (error) {
      console.log(error);
      next(error);
    }
  });


  // Get Details
router.get("/movies/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      /* get a single book by it's id */
      //Single populate:
       const movies = await Movies.findById(id).populate('cast');

       res.render("movies/movie-details",  movies );
    }
   catch (error) {  
    console.log(error);
    next(error);
  }
});

//delete book button route
router.post("/movies/:id/delete", async (req, res, next) => {
    try {
      const { id } = req.params;
      await Movies.findByIdAndDelete(id);
      res.redirect("/movies");
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

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
      const { title, genre, plot, cast } = req.body; //-> we would not have access to req.body if we had a reouter.get. ONLY on the .poost
  
      await Movies.findByIdAndUpdate(id, { title, genre, plot, cast });
  
      res.redirect(`/movies/${id}`);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });





module.exports = router;