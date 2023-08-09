// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

//pass all the celebrities from your database so users can choose which ones are in the cast of the movie you're just creating
const Movie = require("../models/Movie.model.js");
const Celebrity = require("../models/Celebrity.model.js");

// all your routes here
//GET route: /movies/create
//render 

router.get("/movies/create", async (req, res) => {
  try {
    let celebrities = await Celebrity.find();
    res.render("movies/new-movie.hbs", { celebrities });
  } catch (error) {
    console.log(error);
  }
});

// movies/create POST route
router.post("/movies/create", async (req, res) => {
  try {
    //Object destructuring with req.body
    // There's always a match between an inpiut's name and a req.body properties name
    const { title, genre, plot, cast } = req.body;

    await Movie.create({ title, genre, plot, cast });
    res.redirect("/movies");
  } catch (error) {
    console.log(error);
  }
});


// Display a list of all the movies in the DB
  // GET 
  router.get("/movies", async (req, res) => {
    try {
      // get all movies from our Database via .find() method
      let allMoviesFromDb = await Movie.find();
  
      res.render("movies/movies", { movies: allMoviesFromDb });
    } catch (error) {
      console.log("Error while getting movies", error);
    }
  });


module.exports = router;



// #8.2 Iteration
// GET route to display the form to update a specific movie
router.get("/movies/:movieId", async (req, res) => {
    try {
      const { movieId } = req.params;
      let foundMovie = await Movie.findById(movieId);
      await foundMovie.populate("cast")
      res.render("movies/movie-details.hbs", { movie: foundMovie });
    } catch (error) {
      console.log(error);
    }
  });


  // #9.2 DELETING 
  router.post("/movies/:movieId/delete", async (req, res) => {
    try {
      const { movieId } = req.params;
      await Movie.findByIdAndRemove(movieId);
      res.redirect("/movies");
    } catch (error) {
      console.log(error);
    }
  });




  
// #10 EDITING 

router.get("/movies/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;
    const updateMovie = await Movie.findById(id);
    const celebrities = await Celebrity.find();
    res.render("movies/edit-movie.hbs", { updateMovie, celebrities });
  } catch (error) {
    console.log(error);
  }
});

router.post("/movies/:id/edit", async (req, res) => {
  try {
    //Destructure the req.params object to get the bookId
    const { id } = req.params;
    const { title, genre, plot, cast } = req.body;

    //update the same document with new content
    await Movie.findByIdAndUpdate(
      id,
      { title, genre, plot, cast },
      { new: true }
    );

    //redirect to books list page
    res.redirect("/movies");
  } catch (error) {
    console.log(error);
  }
});


// router.get("/movies/:id/edit"), async (req,res) => {
//   try {
//     const {movieId} = req.params;
//     let [movie, celebrities] = await Promise.all([
//       Movie.findById(movieId),
//       Celebrity.find()
//     ]);
//     res.render("/movies/edit-movie", {movie, celebrities});

//   }
//   catch(error) {
//     console.log(error);

//   }
// }

// router.post("movies/edit-movie"), (req,res)=> {
//   const movieId = req.params
//   const{title, genre, plot, cast } = req.body;
// }
