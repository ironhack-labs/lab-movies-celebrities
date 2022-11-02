const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model"); // Required for the "Cast"
const router = require("express").Router();

// router.get("/movies/create", (req, res, next) => 
// res.render ("movies/new-movie"));

//Create a New Movie
router.get("/movies/create", async (req, res, next) => {
    try {
        const celebrities = await Celebrity.find();
        res.render("movies/new-movie", {celebrities})
    } catch (error) {
        console.log(error);
        next(error);
    }
})

router.post("/movies/create", async (req, res, next) => {
  try {
    const {title, genre, plot, cast} = req.body;
    let createdMovie = await Movie.create({title, genre, plot, cast})
    res.redirect('/movies/create');
} catch (error) {
    console.log(error);
    next(error);
}
});

//List the Movies
router.get("/movies", async (req, res, next) => {
    try{
    const allMovies = await Movie.find(); 
    res.render('movies/movies.hbs',  { allMovies });
} catch(error) {
    console.log(error);
    next(); 
}
});

//Get Details for each Movie
router.get("/movies/:id", async (req, res, next) => {
    try {
    const movies = await Movie.findById(req.params.id);
    res.render("movies/movie-details", movies);
}   catch (error) {
    console.log(error);
    next(error);
}
});

router.post("/movies/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const {title, genre, plot, cast} = req.body 

    const datailedBook = await Book.findByIdAndUpdate(id, {title, genre, plot, cast});

    res.redirect('movies/movie-details');
} catch {
    console.log(error);
    next(error);
}
})


module.exports = router;


