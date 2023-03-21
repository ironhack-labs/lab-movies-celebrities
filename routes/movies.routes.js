const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js

// all your routes here

router.get("/movies/create", (req,res,next)=> {
Celebrity.find()
.then((celebritiesArr) => {
 
  const data = {
    celebrities : celebritiesArr
  }
  res.render("movies/new-movie" , data);
})
.catch((error)=> {
  console.log("Error")
});
  
});



router.get("/movies",(req,res,next)=> {

    Movie.find()
    .populate("celebrity")
    .then((movieArr) => {
    
        const data = {
            movie: movieArr
        };
    
        res.render("movies/movies", data);
      })
      .catch((error) => {
        console.log("Error getting movies from DB");
      });
    });
    


 


    router.post ("/movies/create", (req,res,next)=> {
        console.log(req.body);
        const { title, genre, plot, cast } = req.body;
    
        Movie.create({ title, genre, plot, cast})
        .then((movieFromDB)=> {
            res.redirect("/movies");
        })
        .catch((error) => {
            console.log("Error");
    
          });
    })
    

    //Read movie details
    router.get("/movies/:movieId/movie-details", (req, res, next) => {

        const { movieId } = req.params;
      
        Movie.findById(movieId)
          .populate("celebrity")
          .then(movieDetails => {
      
            res.render("movies/movie-details", movieDetails);
          })
          .catch(e => {
            console.log("error", e);
            next(e);
          });
      
      });
      
      router.post('/movies/:movieId/delete', (req, res, next) => {
        const { movieId } = req.params;
        let movieDetails;
      
        Movie.findByIdAndRemove(movieId)
          .then(() => res.redirect('/movies'))
          .catch(error => next(error));
      });
      

      router.get("/movies/:movieId/edit-movie", (req, res, next) => {
        const { movieId } = req.params;
      
        Movie.findById(movieId)
          .then((movieFromDB) => {
    
            movieDetails = movieFromDB;
            return Celebrity.find(); //get list of cast
        })
        .then(celebritiesArr => {

            const data = {
                movie:movieDetails,
                celebrities: celebritiesArr
            }
            res.render("movies/edit-movie", data);
        })
          .catch((e) => {
            console.log("error ", e);
            next(e);
          });
      });
      



//UPDATE: display form
router.get("/movies/:movieId/edit-movie", (req, res, next) => {
    const { movieId } = req.params;
  
    let movieDetails;
  
    Movie.findById(movieId)
      .then((moviesFromDB) => {
        movieDetails = moviesFromDB; //update variable in the parent scope
        return Movie.find();
      })
      .then((moviesArr) => {
        const data = {
          movie: movieDetails,
        };
  
        res.render("movies/movie-edit.hbs", data);
      })
      .catch((error) => next(error));
  });
  
  //UPDATE: process form
  router.post("/movies/:movieId/edit-movie", (req, res, next) => {
    const { movieId } = req.params;
    const { title, genre, plot, cast } = req.body;
  
    Movie.findByIdAndUpdate(
      movieId,
      { title, genre, plot, cast },
      { new: true }
    )
      .then((updatedMovie) => {
        res.redirect(`/movies`); 
      })
      .catch((error) => next(error));
  });
  

  //DELETE
  router.post('/movies/:movieId/delete', (req, res, next) => {
    const { movieId } = req.params;
  
    Movie.findByIdAndRemove(movieId)
      .then(() => res.redirect('/movies'))
      .catch(error => next(error));
  });
  


module.exports = router;
