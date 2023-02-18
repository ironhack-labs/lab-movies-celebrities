// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require('../models/Movie.model.js');

// all your routes here

router.get('/', async (req, res, next) => {
    try {
        const response = await Movie.find()
        res.render("movies/movies.hbs", {movie: response})
    }
    catch(error){
        console.log(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const response = await Movie.findById(id).populate("cast")
        res.render("movies/movie-details.hbs", {movie: response})
    }
    catch(error){
        console.log(error)
    }
})

router.post('/:id/delete', async (req, res, next) => {
    try {
        const {id} =req.params
        await Movie.findByIdAndDelete(id)
        res.redirect('/movies')
    }
    catch (error){
        console.log(error)
    }
})

router.get('/create', (req, res, next) => {
    res.render('movies/new-movie.hbs')
})

router.post('/create', async (req, res, next) => {
    try {
        const {title, genre, plot, cast} = req.body
        await Movie.create({
            title, genre, plot, cast
        })
        res.redirect("/movies");
    }
    catch(error){
        console.log(error);
        res.render("movies/new-movie");
}

})



module.exports = router;