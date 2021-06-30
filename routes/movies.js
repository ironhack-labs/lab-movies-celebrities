const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");


//create movie
// router.get('/create-movie', (req, res) => {
//     res.render("movies/new-movie");
// });

router.post('/create-movie', async (req, res) => {   
     const { title, genre, plot, cast } = req.body;
await Movie.create({
    title,
    genre,
    plot,
    cast,
});
res.redirect("/movies/movie");
});

//be able to show the movies in a list
router.get("/movies-list", async (req, res) => {
    const moviesFound = await Movie.find();
    res.render("movies/movie", { moviesFound });
});

//and get specific info on that movie
router.get("/movies-list/:movieId", async (req, res) => {               //we are getting a route parameter with the :bookId
    const movieDetail = await Movie.findById(req.params.movieId).populate("cast");   
    res.render("movies/detail-movie", movieDetail);                     //...no need for {}, bookDetail already an object                  
});

//Bring Celebrities from the DB to the drop-down menu in new-movie
router.get("/create-movie", async (req, res) => {
    const allCelebs = await Celebrity.find().sort({ name: 1}).populate("cast");
    res.render("movies/new-movie", { allCelebs });
});


module.exports = router;