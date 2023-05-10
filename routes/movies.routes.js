const Movie = require("../models/Movies.model");
const Celebrity = require('../models/Celebrity.model')

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get('/movies/create', async (req,res)=>{
try {
  const celebrities = await Celebrity.find()
  res.render('movies/new-movie.hbs', {celebrities});
} catch (error) {

}
  });

  router.post('/movies/create',(req,res)=>{
    const {title,genre,plot,cast} = req.body;
    async function createAMovie(){
        try{
            let createdMovie = await Movie.create({title,genre,plot,cast});
            res.redirect('/movies');
        }
        catch(error){
          console.log(error);

        }
    }
    createAMovie();
  })


  router.get("/movies", (req, res) => {
    async function showMovies() {
      try {
        let allMovies = Movie.find().populate('cast');
        res.render("movies/movies.hbs", 
          {movies: allMovies}
        );
      } catch (error) {
        console.log(error);
      }
    }
    showMovies();
});


router.get("/movies/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId).populate("cast");
    res.render("movies/movie-details.hbs", { movie });
  } catch (error) {
    console.log(error);
  }
});


router.post("/movies/:id/delete", async (req, res) => {
  try {
    const movieId = req.params.id;
    await Movie.findByIdAndRemove(movieId);
    res.redirect("/movies");
  } catch (error) {
    console.log(error);
  }
});

router.get("/movies/:id/edit", async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId);

    const celebrities = await Celebrity.find();

    res.render("movies/edit-movie.hbs", { movie, celebrities });
  } catch (error) {
    console.log(error);
  }
});


router.post("/movies/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const { title, genre, plot, cast } = req.body;
    await Movie.findByIdAndRemove(movieId, { title, genre, plot, cast });

    res.redirect(`/movies/${movieId}`);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;



