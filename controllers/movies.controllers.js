const movie = require('../models/movie.model')
const celebrities = require('../models/celebrity.model')

module.exports.create = (req, res) => {
    celebrities.find()
        .then((celebrities) => {
                //console.log("estas son las celebridades: ", celebrities)
                res.render('movies/new-movie', {celebrities: celebrities})
            })
            .catch((next) => console.log(next))
    
}

module.exports.doCreate = (req, res) => {
    const movieData = req.body

    const cast = Array.isArray(movieData.celebrityId)? movieData.celebrityId : [movieData.celebrityId]

    //console.log("movie-data: ",movieData)
    movie.create({
        name: movieData.name,
        genre: movieData.genre,
        plot: movieData.plot,
        cast: cast,
    })
    .then(() => {
        res.redirect("/movies")
        })
        .catch((next) => console.log(next))
    
}

module.exports.list = (req, res, next) => {
    movie.find()
        .populate('cast')
        .then((peliculas) => {
            res.render('movies/movies', {peliculas: peliculas})
            })
            .catch((next) => console.log(next))
}

module.exports.details = (req,res, next) => {
    movie.findById(req.params.id)
        .populate("cast")
        .then((pelicula) => {
            res.render("movies/movie-details", {pelicula})
            })
            .catch()
};

module.exports.delete = (req, res) => {
    movie.findByIdAndRemove(req.params.id)
        .then(() => {
            res.redirect("/movies");
        })
        .catch()
}
  
module.exports.edit = (req, res, next) => {
    let movieData;
    movie.findById(req.params.id)
    .populate("cast")
    .then(movie => {
        movieData = movie
        return celebrities.find();
    })
    .then(celebrities => {
        console.log("esto es movie :", movie)
        res.render('movies/edit-movie', {movie: movieData, allCelebrities: celebrities})
    })
    .catch()
}

module.exports.doEdit = (req, res, next) => {
    movie.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        genre: req.body.genre,
        plot: req.body.plot,
    })
    .then(movie => {
        res.redirect(`/movies/${movie.id}`)
    })
}





