const router = require("express").Router();

const async = require("hbs/lib/async");
const Movie = require("../models/Movie.model");


//create a new movie (get/post)

router.get('/create', (req, res, next) =>{
    try {
        res.render('movies/new-movie');
    } catch (error) {
        next(error);
    }
});

router.post('/create', async (req, res, next) =>{
    try {
        const {title, genre, plot, cast} =req.body;
        await Movie.create({title, genre, plot, cast});
        // res.redirect('/movies');
        
    } catch (error) {
        next(error)
    }
})


module.exports = router;