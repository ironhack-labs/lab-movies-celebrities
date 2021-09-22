// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model")
// all your routes here

router.get('/create', (req, res, next) => {

    Celebrity.find()
    .then((data) => {
        // console.log(data)
        res.render('movies/new-movies', {
        dbUsers: data})
    })
    .catch((error) => {console.log(error)})

})


router.post('/create', (req, res, next) => {

    const {title, genre, plot, cast} = req.body
    Movie.create({
        title, genre, plot, cast
    })
    .then((newMovie) => {
        console.log(newMovie)
        res.redirect("/movies")
    })
    .catch((error) => (res.render("movie/new-movie")))
})

router.get('/', (req, res, next) => {

    Movie.find()
    .then((dbMovs) => {
        res.render('movies/movies',{
            movieList: dbMovs
        })
        
    })
    .catch(() => {console.log(e)})
})

module.exports = router;
