
const moviesRoutes = require("express").Router();
const Movie = require('../models/Movie.model')
const Celebrity  = require('../models/Celebrity.model');

moviesRoutes.get('/create', (req, res, next) => {
    Celebrity.find()
    .then(celebrities => {
        res.render('movies/new-movie', {celebrities});
    })
    .catch(error => next(error))
    
})

moviesRoutes.post('/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body
    Movie.create( { title, genre, plot, cast } )
    .then(movie => {
        console.log('added movie ', movie);
        res.redirect('/movies');
    })
    .catch(error => next(error))
    
})

moviesRoutes.get('/', (req, res, next) => {
    Movie.find()
    .then(movies => {
        res.render('movies/movies', { movies });
    })
    .catch(error => next(error))

})

moviesRoutes.get('/:id/detail', (req, res, next) => {
    const { id } = req.params
    Movie.findById( id )
    .populate( {path: 'cast'} )
    .then(movieDetail => {

        res.render('movies/movie-details',  { movieDetail } );
        console.log(movieDetail);
    })
    .catch(error => next(error))

})

moviesRoutes.get('/:id/delete', (req, res, next) => {
    const { id } = req.params;
    Movie.findByIdAndRemove( id )
    .then(movieDeleted => {
        console.log('deleted movie ', movieDeleted);
        res.redirect('/movies');
    })
    .catch(error => next(error))
    
})

moviesRoutes.get('/:id/edit', async (req, res, next) => {
    const { id } = req.params;
    try{
        const movie = await Movie.findById( id );
        const celebrities = await Celebrity.find();
        res.render('movies/edit-movie', { movie, celebrities });
    } catch (error){
        next(error);
    }
})

moviesRoutes.post('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { title, genre, plot, cast } = req.body

    try{
        await Movie.findByIdAndUpdate( id, { title, genre, plot, cast } )
        const movieDetail = await Movie.findById( id ).populate( {path: 'cast'} )
        res.render('movies/movie-details',  { movieDetail } );
    } catch (error){
        next(error);
    }
})

module.exports = moviesRoutes;