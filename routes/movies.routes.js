let router = require('express').Router();
let Movie = require("../models/Movie.model");
let Celebrity = require("../models/Celebrity.model");

router.get("/movies/create", (req,res)=>{
    async function findAllCelebs(){
        try{
            let allCelebs = await Celebrity.find();
            res.render("movies/new-movie.hbs", {celebrities: allCelebs});
        }
        catch(error){
            console.log(error);
        }
      }
      findAllCelebs();
    
});

router.post("/movies/create", (req,res)=>{

    let {title, genre, plot, cast} = req.body;
 
    async function createMovieInDb(){
     try{
        let createdMovie = await Movie.create({title, genre, plot, cast});
        res.redirect("/movies");
     }
     catch(error){
        console.log(error)
        res.redirect("/movies/create");
     }
    }
 createMovieInDb();
 });

router.get("/movies", (req,res)=>{
    async function findAllMovies(){
        try{
            let allMovies = await Movie.find();
            res.render("movies/movies.hbs", {movies: allMovies});
            let celebName = await Celebrity.findById();
        }
        catch(error){
            console.log(error);
        }
      }
      findAllMovies();
})

router.get('/movies/:id', (req,res)=>{
    async function findMovie(){
     try{ 
         let movieId = req.params.id;
         let movie = await Movie.findById(movieId).populate("cast");
         res.render("movies/movie-details.hbs", {movie});
     }
     catch(error){
         console.log(error);
     }
    }
    findMovie();
 })

router.post("/movies/:id/delete", (req, res) => {
    async function deleteMovie(){
    try {
      let movieId = req.params.id;
      await Movie.findByIdAndRemove(movieId);
      res.redirect("/movies");
     } catch (error) {
      console.log(error);
     }
    }
    deleteMovie();
});

router.get("/movies/:id/edit", (req, res) => {
    async function findMovieInfo (){
    try {
      let movieId = req.params.id;
      let movie = await Movie.findById(movieId);
      let celebrities = await Celebrity.find();
      res.render("movies/edit-movie.hbs", { movie, celebrities });
    } catch (error) {
      console.log(error);
    }
}
findMovieInfo();
});
  
router.post("/movies/:id", (req, res) => {
    async function editMovie (){
    try {
      let movieId = req.params.id;
      let {title, genre, plot, cast} = req.body;
      await Movie.findByIdAndUpdate(movieId, {title, genre, plot, cast});
      res.redirect(`/movies/${movieId}`);
    } catch (error) {
      console.log(error);
    }
}
editMovie();
});

module.exports = router;