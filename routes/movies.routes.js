const router = require("express").Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

/* GET movies page */
router.get('/create', (req, res, next) => {
    Celebrity.find()
    .then(allTheCelebritiesFromDB => {
        res.render('movies/new-movie', {allTheCelebritiesFromDB});

    })
.catch(err =>next(err))
} )


  router.post("/create", (req, res, next) => {
	console.log(req.body)
	const { title, genre, plot, cast } = req.body
    console.log(cast);
	Movie.create({  title, genre, plot, cast })
		.then(createdMovie => {
			console.log(createdMovie)
			res.redirect('/movies')
			
		})
		.catch(err => res.render('movies/new-movie')
            )
})

router.get('/', async (req, res, next) => {
    try {

        const allMovies = await Movie.find()
        res.render('movies/movies', { allMovies})
        
    } catch (error) {
     console.log(error)   
    }
  
 /*   Movie.find()
      .then(allTheMoviesFromDB => {
        console.log('Retrieved movies from DB:', allTheMoviesFromDB);
   
        res.render('movies/movies', {allTheMoviesFromDB});
        console.log(allTheMoviesFromDB)
      })
      .catch(error => {
        console.log('Error while getting the movies from the DB: ', error);
   
        next(error);
      });*/
  });

module.exports = router;
