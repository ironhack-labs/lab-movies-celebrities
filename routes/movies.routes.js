const router = require("express").Router();
const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')

// new movie form (render)
router.get("/movies/create", (req, res, next) => {
    Celebrity
        .find()
        .then(celebrities => {
            res.render("movies/new-movie", { celebrities })
        })
        .catch(err => console.log(err))
})



// new movie form (handler)
router.post("/movies/create", (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    Movie
        .create({ title, genre, plot, cast })
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

// list of movies 
router.get('/movies', (req, res, next) => {
    Movie
        .find()
        .then(movies => res.render("movies/movies", { movies }))
        .catch(err => console.log(err))
})
// movies details
router.get("/movies/:id", (req, res, next) => {
    const { id } = req.params
    Movie
        .findById(id)
        .populate('cast')
        .then(movie => res.render('movies/movie-details', movie))
        .catch(err => console.log(err))
})

//delete movie
router.post('/movies/:id/delete', (req, res, next) => {
    const { id } = req.params

    Movie
        .findByIdAndDelete(id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

//movie edit(render)
router.get(`/movies/:id/edit`, (req, res, next) => {
    const { id } = req.params
    Celebrity
        .find()
        .then((celebrities) => {
            Movie
                .findById(id)
                .then(movie => {
                    movie.celebrities = celebrities
                    res.render("movies/edit-movie", movie)
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    // Movie
    //     .findById(id)
    //     .populate("cast")
    //     .then(movieEdit => res.render("movies/edit-movie", movieEdit))
    //     .catch(err => console.log(err))

})

//movie edit(handler)
router.post(`/movies/:id/edit`, (req, res, next) => {
    const { title, genre, plot, cast } = req.body
    const { id } = req.params


    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => res.redirect(`/movies/${id}`))
        .catch(err => console.log(err))



})



module.exports = router;