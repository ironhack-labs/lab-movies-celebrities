const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

router.get("/movies/create", async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find();
    res.render("movies/new-movie.hbs", { celebrities });
  } catch (error) {
    next(error);
  }
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  const movieObj = { title, genre, plot, cast };
  Movie.create(movieObj)
    .then(() => {
      res.redirect('/movies');
    })
    .catch((error) => next(error));
});

router.get("/movies", async (req, res, next) => {
  try {
    const movies = await Movie.find().populate("cast");

    res.render("movies/movies.hbs", { movies });
  } catch (error) {
    next(error);
  }
});

router.get("/movies/:id", (req, res, next) => {
  Movie.findById(req.params.id).populate('cast')
    .then((movie) => {
      res.render("movies/movie-details", movie);
    })
    .catch((error) => next(error));
});

router.post('/movies/:id/delete', (req, res, next) =>{

    Movie.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.redirect('/movies');
    }).catch((error) => next(error));
})

router.get('/movies/:id/edit', async (req, res, next) =>{
    
    try {
        const movie = await Movie.findById(req.params.id);
        const celebrities = await Celebrity.find();
        res.render('movies/edit-movie', { movie, celebrities });
    } catch (error) {
        next(error);
    }
})

router.post('/movies/:id/edit', (req, res, next) =>{
    Movie.findByIdAndUpdate(req.params.id, {... req.body})
    .then(()=>{
        res.redirect(`/movies/${req.params.id}`);
    }).catch((error) => next(error));
})

module.exports = router;
