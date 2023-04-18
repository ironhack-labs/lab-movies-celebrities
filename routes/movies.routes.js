const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

const router = require("express").Router();


router.get('/movies', (req, res, next) =>{
  res.render('movies/movies')
})
// all your routes here
router.get('/movie/create', (req, res, next) => {
  console.log('SEND ME TO NEW MOVIE HBS FILE')
  const celebrities = Celebrity.find().then(celebs => {
    res.render('movies/new-movie', { celebs })
  }).catch(err => console.log(err))
})

router.post('/movie/create', (req, res, next) => {
  Movie.create({
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast
  })
  .then(createdMovie => {
    console.log('############################### Created Movie #############', createdMovie)
    res.redirect('/movies')
  })
})

// router.post('/celebrities/create', (req, res, next) => {
//   console.log(req.body)
//   Celebrity.create({
//     name: req.body.name,
//     occupation: req.body.occupation,
//     catchPhrase: req.body.catchPhrase
//   })
//   .then(createdCelebrity => {
//     console.log('---------------- Created Celebrity: ---------------------' + createdCelebrity)
//     res.redirect('/celebrities')
//   })
// })

module.exports = router;