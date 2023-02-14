// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
const Celebrity = require("../models/Celebrity.model");

const Movie = require("../models/Movie.model");

router.get("/movies", async (req, res, next) => {

  try {
    let movies = await Movie.find();

    res.render("celebrities/movies", { movies });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/movies/create", (req, res, next) => {
    const celebrities = Celebrity.find()
    res.render("celebrities/new-movies", { celebrities });
  });
  
  router.post("/movies/create", async (req, res, next) => {

try {
        const { title, genre, plot, cast  } = req.body;
    
        await Movie.create({ title, genre, plot, cast });
    
        res.redirect("/movies");
      } catch (error) {
        console.log(error);
        next(error);
      }
    });

router.get("/movies", async (req, res, next) => {
    try {
        let movies = await Movie.find(); 
        res.render("movies/movies", { movies });
    } catch(error) {
        console.log(error)
        next(error)
    }
})


router.get('/movies/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id).populate('cast')

        const celebrities = await Celebrity.find();
        res.render("movies/movie-details", { movie, celebrities }); 
    } catch (error) {
        console.log(error);
        next(error);
        
    }
})


module.exports = router;


// readme:  remember to link these two new files to either app.js or routes/index.js so your server has access to them. ???? how and which one of those 2