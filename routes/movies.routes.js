const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

const router = require('express').Router();

router.get('/movies/create', (req, res, next) => {
  
  Celebrity.find()
    .then(celebsArray => {
      res.render('movies/new-movie', { celebsArray });    
    })
    .catch(err => console.log(err));
  
});

router.post('/movies/create', (req, res, next) => {

  // const { title, plot, genre, cast } = req.body;
  const title = req.body.title;
  const plot = req.body.plot;
  const genre = req.body.genre;
  const cast = req.body.cast;

  Movie.create({
    title,
    plot,
    genre,
    cast
  })
    .then(() => res.redirect('/movies'))
    .catch(err => console.log(err));
});

router.get('/movies', (req, res, next) => {
  Movie.find()
  .then(moviesArray => {
    console.log(moviesArray);
    res.render('movies/movies', { moviesArray });
  })
  .catch(err => console.log(err));
});

router.get('/movies/:id', (req, res, next) => {
  const movieId = req.params.id;

  Movie.findById(movieId)
    .populate('cast')
    .then(myFoundMovie => {
      res.render('movies/movie-details', myFoundMovie);
    })
    .catch(err => console.log(err));

});

router.post('/movies/:id/delete', (req, res, next) => {

  const movieId = req.params.id;

  Movie.findByIdAndDelete(movieId)
    .then(() => res.redirect('/movies'))
    .catch(err => console.log(err));
})

router.get('/movies/:id/edit', (req, res, next) => {

  const movieId = req.params.id;

  Movie.findById(movieId)
    .populate('cast')
    .then(myFoundMovie => {

      const myMovieAndCelebsObject = {};

      myMovieAndCelebsObject._id = myFoundMovie._id;
      myMovieAndCelebsObject.title = myFoundMovie.title;
      myMovieAndCelebsObject.plot = myFoundMovie.plot;
      myMovieAndCelebsObject.genre = myFoundMovie.genre;

      // console.log(myMovieAndCelebsObject);

      Celebrity.find()
        .then(myCelebsArray => {

          // console.log(myCelebsArray)

          const myNewCelebsArray = myCelebsArray.map(singleCeleb => {
            const celebObject = {};
            myFoundMovie.cast.forEach(castMember => {
              console.log(castMember._id, singleCeleb._id)
              if(String(castMember._id) === String(singleCeleb._id)){
                celebObject.selected = true;
              }
            });
            celebObject.name = singleCeleb.name;
            celebObject._id = singleCeleb._id;

            return celebObject;

          })

          // console.log(myNewCelebsArray);

          myMovieAndCelebsObject.myCelebsArray = myNewCelebsArray;

          // console.log(myMovieAndCelebsObject);

          res.render('movies/edit-movie', myMovieAndCelebsObject);

        })
        .catch(err => console.log(err));

    })
    .catch(err => console.log(err));

  
})

router.post('/movies/:id/edit', (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  const movieId = req.params.id;

  Movie.findByIdAndUpdate(movieId, {
    title,
    genre,
    plot,
    cast
  })
    .then(() => res.redirect(`/movies/${movieId}`))
    .catch(err => console.log(err));

})

module.exports = router;