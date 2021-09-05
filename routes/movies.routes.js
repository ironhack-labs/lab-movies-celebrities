const router = require("express").Router();
// STARTER ROUTER CODE



module.exports = router;

const Movie = require('./models/Movie.model')


router.get('/movies/create', (req, res) => {

    Movie
      .find()
      .select('title')
      .then(movies => res.render('./movies/list', { movies }))
      .catch(err => console.log(err))


module.exports = router


router.post('/movies/create', (req, res) => {

  const { title, genre, plot, cast } = req.body

  Movie
    .create({ title, genre, plot, cast })
    .then(theMovie => res.redirect(`/movies/list/${theMovie._id}`))
    .catch(err => res.render('/movies/new movie'))
})})
