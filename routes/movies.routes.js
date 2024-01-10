// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const celebritiesModel = require("../models/celebrity.model");
const moviesModel = require("../models/movie.model");



// all your routes here

router.get('/', (req, res) => {
    moviesModel.find()
        .then((dataFromDataBase) => {
            
            res.render('movies/movies.hbs', { movies: dataFromDataBase });
        })
        .catch(error => next(error));
});


router.get('/create', (req, res) => {
    celebritiesModel.find()
    .then((dataFromDataBase) => {
        res.render('movies/new-movie.hbs', { "celebrities": dataFromDataBase });
    })
    .catch(error => next(error));
});

router.post('/create', (req, res, next) => {
   const { title, genre, plot, cast } = req.body
    moviesModel.create({ title, genre, plot, cast })
        .then((doc) => {
            res.redirect(301, '/movies');
        })
        .catch((err) => {
            console.error(err);
            res.render('movie/new-movie.hbs')
        })
})

router.get('/:movieId/edit', (req, res, next) => {
    const { movieId } = req.params;
   
    moviesModel.findById(movieId)
        .populate('cast')
        .then(movieToEdit => {
            celebritiesModel.find()
                .then((celebritiesDataFromDB) => {
                    res.render(
                        'movies/edit-movie.hbs', 
                        { movieData: movieToEdit, celebrities: celebritiesDataFromDB }
                    );
                })
        })
        .catch(error => next(error));
});

router.post('/:movieId/edit', (req, res, next) => {
    const { movieId } = req.params;
    const { title, genre, plot, cast } = req.body;
   
    moviesModel.findByIdAndUpdate(movieId, { title, genre, plot, cast }, { new: true })
      .then(updatedMovie => res.redirect(`/movies/${updatedMovie.id}`)) // go to the details page to see the updates
      .catch(error => next(error));
  });
   


router.post('/:movieId/delete' , (req, res) => {
    const { movieId } = req.params;

    moviesModel.findByIdAndDelete(movieId)
        .then(dataFromDataBase => {
            res.redirect(302, '/movies');
        })
        .catch(error => next(error));
})

router.get('/:movieId' , (req, res) => {
    const { movieId } = req.params;
    moviesModel.findById(movieId)
        .populate('cast')
        .then(dataFromDataBase => {
            res.render('movies/movie-details.hbs', { movieData: dataFromDataBase });
        })
        .catch(error => next(error));
})

module.exports = router;