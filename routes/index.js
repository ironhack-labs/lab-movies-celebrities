const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')
const Movie = require("../models/Movie.model")


//CELEBRITIES

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get('/celebrities/new-celebrities', (req, res) => res.render('celebrities/new-celebrities'));

router.post('/celebrities/new-celebrities', async (req, res, next) => {
  try {
    const { name, occupation, catchPhrase } = req.body;
    await Celebrity.create({ name, occupation, catchPhrase });
    res.redirect('celebrities');
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/celebrities/celebrities', async (req, res, next) => {

  try {
    let celebrities = await Celebrity.find()
    res.render("celebrities/celebrities", {celebrities})
  } catch (error) {
    console.log(error)
    next(error)
  } 
});


//MOVIES

router.get('/movies/new-movie', async (req, res, next) => {

try {
  const celebrities = await Celebrity.find()
  
  res.render('movies/new-movie', {celebrities});
} catch (error) {
  console.log(error);
  next(error);
}

  
})


router.post('/movies/new-movie', async (req, res, next) => {
  try {
    const { title, genre, plot, cast} = req.body;
    await Movie.create({ title, genre, plot, cast});
    res.redirect('movies')
  } catch (error) {
    console.log(error)
    next(error)
  }
});

router.get('/movies/movies', async (req, res, next) => {

  try {
    const movies = await Movie.find()
    res.render("movies/movies", {movies})
  } catch (error) {
    console.log(error)
    next(error)
  } 
});

router.get('/movies/:id', async (req, res, next) => {
try {
  const {id} = req.params
  const movie = await Movie.findById(id).populate('cast')
  res.render('movies/movie-details', movie)
} catch (error) {
  console.log(error)
    next(error)
}
})

router.post('/movies/:id/delete', async (req, res, next) => {
  try {
      const { id } = req.params;
      await Movie.findByIdAndDelete(id);
      res.redirect('/movies/movies')
  } catch (error) {
      console.log(error);
      next(error); 
  }
})

router.get('/movies/:id/edit', async (req, res, next) => {
  try {
      const { id } = req.params;
      const movie = await Movie.findById(id);
      const celebrities = await Celebrity.find();
      res.render('movies/edit-movie', {movie, celebrities});
  } catch (error) {
      console.log(error);
      next(error);
  }
})

router.post('/movies/:id/edit', async (req, res, next) => {
  try {
      const {id} = req.params
      const { title, genre, plot, cast } = req.body
      await Movie.findByIdAndUpdate(id, { title, genre, plot, cast });
      res.redirect('/movies/movies')
  } catch (error) {
      console.log(error);
      next(error);
  }
})



module.exports = router;
