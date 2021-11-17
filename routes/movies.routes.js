const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/movies/create",(req,res)=>{
    res.render("movies/new-movie");
})

router.post("/movies/create",(req,res)=>{
    const { title, genre, plot, cast } = req.body;
    Movie
    .create({ title, genre, plot ,cast })
    .then((createdMovie) => {
            res.redirect(`movies${createdMovie._id}`);
          })
    .catch( (err) => console.log(err));

});

router.get("/movies",(req,res)=>{
    Movie
    .find()
    .populate("celebrities")
    .then((movieList) => {  // array with found books
        console.log(movieList)
        res.render("movies/movies", { listofMovies: movieList })
      })
      .catch( (err) => console.log(err));
    })



module.exports = router;
