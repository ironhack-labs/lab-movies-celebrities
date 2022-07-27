// IMPORT MOVIE MODEL
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

// LIST OF MOVIES
module.exports.list = (req, res, next) => {
    Movie.find()
    .then(movies => {
        res.render('movies/movies', { movies })
    })
    .catch(err => console.log(err))    
}

// CREATE MOVIE
module.exports.create = (req, res, next) => {
    Celebrity.find()
    .then(celebrities => {
        res.render('movies/new-movie', { celebrities })
    })
    .catch(console.log('You have to create a celebrity first'))    
}

module.exports.doCreate = (req, res, next) => {

    Movie.create(req.body)
    .then(movieCreated => {
        res.redirect('/movies')
    })
    .catch(res.render('movies/new-movie'))
}

// MOVIE DETAIL 

module.exports.detail = (req, res, next) => {
    const { id } = req.params

    Movie.findById(id)
    .populate('cast')
    .then(movie => {
        res.render('movies/movie-detail', { movie })
    })
    .catch(err => console.log(err))    
}

// DELETE MOVIE

module.exports.delete = (req, res, next) => {
    const { id } = req.params

    Movie.findByIdAndRemove(id)
    .then(movieDeleted => {
        res.redirect('/movies')
    })
    .catch(err => console.log(err))
}

// EDIT MOVIE

module.exports.edit = (req, res, next) => {
    const { id } = req.params
    let movie = null

    Movie.findById(id)
    .then(movieInfo => {
        movie = movieInfo
        return Celebrity.find()
    })
    .then(celebrities => {
        res.render('movies/edit-movie', { movie, celebrities })
    })
    .catch(err => console.log(err))  
}


module.exports.doEdit = (req, res, next) => {
    const { id } = req.params

    Movie.findByIdAndUpdate(id, req.body, { new: true })
    .then(movie => {
        res.redirect(`/movies/${id}`)
    })
    .catch(err => console.log(err)) 
}