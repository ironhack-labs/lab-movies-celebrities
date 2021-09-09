const router = require("express").Router();

// require the Movies model here
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');



/* Iteration #6: Adding New Movies */
/* router.get('/movies/create', (req, res, next) => {
    res.render('movies/new-movie.hbs');
}); */

// Necesito mezclar Celebrities y Movies 
router.get('/movies/create', (req, res, next) => {
	Celebrity
    .find()
		.then(celebritiesDB => {
			res.render('movies/new-movie.hbs', { celebrities: celebritiesDB });
		})
		.catch((err) => console.log('Error', err));
});
  
router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    Movie
      .create({ title, genre, plot, cast })
      .then(() => res.redirect('/movies'))
      .catch(error => next(error));
}); 



/* Iteration #7: Listing Our Movies */
router.get('/movies', (req, res, next) => {
    Movie
        .find()
        .populate('cast')// --> we are saying: give me whole cast object????
        .then(moviesDB => {
          res.render('movies/movies.hbs', {movies: moviesDB});
        })
        .catch(error => {
          console.log('Error while getting the drones from the DB: ', error);
          next(error);
        });
    });

/* Iteration #8: The Movie Details Page */
router.get('/movies/:id', (req, res, next) => {
    Movie
        .findById(req.params.id) 
        .populate('cast')// --> we are saying: give me whole cast object????
        .then(thisMovie => {
            res.render('movies/movie-details.hbs', thisMovie)
        })
        .catch(error => {
            console.log('Error ', error);
            next(error);
        });
});



/* Iteration #9: Deleting Movies */
router.post('/movies/:id/delete', (req, res, next) => {
    Movie
        .findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/movies'))
        .catch(error => next(error));
  });



router.get('/movies/:id/edit', (req, res, next) => {
  const p1 =  Movie.findById(req.params.id)
  const p2 =  Celebrity.find()
  Promise.all([p1, p2])

      .then(([p1, p2] )=> {
        res.render('movies/edit-movie.hbs', { p1, p2 }); 
      })
      .catch(error => next(error));
});
  
router.post('/movies/:id/edit', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    Movie
      .findByIdAndUpdate(req.params.id, { title, genre, plot, cast}, { new: true })
      .populate('cast')// --> we are saying: give me whole cast object????

      .then(() => res.redirect('/movies'))
      .catch(error => next(error));
});  



module.exports = router;
