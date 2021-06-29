// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');



router.get("/movies/create", async (req, res, next) => {
    const celebritiesFromDB = await Celebrity.find();
    res.render("movies/new-movie", {
        celebritiesFromDB
    });
});



router.post('/movies/create', async (req, res) => {
    try {

        const {
            title,
            genre,
            plot,
            cast
        } = req.body; //names need to match the names on the form
        //accessing the info we place on the browser
        await Movie.create({
            title,
            genre,
            plot,
            cast
        });
        res.redirect('/movies');

    } catch (e) {
        res.redirect('/movies/create');
    }
});





router.get("/movies/create", async (req, res, next) => {
    const celebritiesFromDB = await Celebrity.find();
    res.render("movies/new-movie", {
        celebritiesFromDB
    });
});


router.get("/movies", async (req, res, next) => {
    try {
        const moviesFromDB = await Movie.find();
        res.render("movies/movies", {
            moviesFromDB
        });

    } catch (e) {
        console.log(e);
    }


});




router.get('/movies/:movieId', async (req, res) => {
    try {
        const movieDetail = await Movie.findById(req.params.movieId).populate('cast');
        res.render('movies/movie-details', {
            movieDetail
        });
    } catch (e) {
        console.log(e);
    }
});


//Delete
router.post('/movies/:movieId/delete', async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.movieId);
        res.redirect('/movies');
    } catch (e) {
        console.log(e);
    }

});




//Edit
//Update
//Render edit book form with the book we are editing
router.get('/movies/:movieId/edit', async (req, res) => {
    const movieToEdit = await Movie.findById(req.params.movieId).populate('cast');
    const allCelebrities = await Celebrity.find().sort({
        name: 1
    });
    res.render('movies/edit-movie', {
        movieToEdit,
        allCelebrities
    });
});

router.post('/movies/:movieId/edit', async (req, res) => {
    const {
        title,
        genre,
        plot,
        cast
    } = req.body;
    await Movie.findByIdAndUpdate(req.params.movieId, {
        title,
        genre,
        plot,
        cast,
    });
    res.redirect('/movies');
});















module.exports = router;