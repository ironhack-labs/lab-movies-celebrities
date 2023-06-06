const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

router.get('/movies/create', async (req, res, next) => {
    try {
        const celebrities = await Celebrity.find();
        res.render("movies/new-movie.hbs", {celebrities});
    } catch (error) {
        next(error);
    }
})


router.post('/movies/create', (req,res,next)=>{
    const {title, genre, plot, cast} = req.body;
    const movieObj = { title, genre, plot, cast };
    Movie.create(movieObj)
        .then(movie =>{
            res.send('movies/create:' + movie)
            // res.redirect('/movies')
        }).catch(error=>next(error))
})


module.exports = router;