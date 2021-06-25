const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model.js");


module.exports.addMovie = (req, res, next) =>{
    Celebrity.find()
    .then((celebrities) => {
        res.render("movies/new-movie", {celebrities});
    }) 
};

module.exports.doAddMovie = (req, res, next) =>{
    console.log(req.body);
    Movie.create(req.body)
        .then(() =>{
            res.redirect("/movies");
        }) .catch(()=>{
            res.render("movies/new-movie");
        })
}

module.exports.viewMovies = (req, res, next) => {
    Movie.find()
        .then((movies) => {
            res.render("movies/movies", {movies})
        }) .catch ((e) =>{
            console.log(e)
        })
}

module.exports.movieDetails = (req, res, next) => {
    const {id} = req.params;
    Movie.findById(id)
    .populate("cast")
    .then((movie) => {
        res.render("movies/movie-details", movie)
    }) .catch ((e) =>{
        console.log(e)
    })
}

module.exports.deleteMovie = (req, res, next) => {
   Movie.findByIdAndDelete(req.params.id)
   .then(()=>{
       res.redirect("/movies")
   }).catch ((e) =>{
    console.log(e)
})
}

module.exports.editMovie = (req, res, next) => {
    console.log("Entering edit movies")
    Promise.all([Movie.findById(req.params.id), Celebrity.find()])
    .then(([movie, celebrities]) => {
        res.render("movies/edit-movies", { movie, celebrities })
    })
    .catch((e) => console.error(e))
}

module.exports.doEditMovie = ((req, res, next) => {
    Movie.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.redirect(`/movies/${req.params.id}`))
        .catch(() => res.redirect(`/movies/${req.params.id}/edit`))
}) 