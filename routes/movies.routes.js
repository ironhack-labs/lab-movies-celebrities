// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const MovieModel = require("../models/Movie.model");
const CelebrityModel = require("../models/Celebrity.model");


// route to display the new celebrity form / creation 
router.get("/create", async (req,res) => {
    const celebrities = await CelebrityModel.find();
    res.render("movies/new-movie", {celebrities});
});

// route to post /submit the new celebrity 
router.post("/create", async (req,res) => {
    try {
        const newMovie = await MovieModel.create(req.body);
        res.redirect("/movies/movies");
    }
    catch (err) {
        console.log(err);
        res.redirect("/movies/new-movie")};
});


// route to disaplay the list of created celebrities 
router.get("/movies", async (req,res) => {
    try {
        const allMovies = await MovieModel.find();
        console.log(allMovies);
        res.render("movies/movies", {allMovies});
    }
    catch (err) {
        console.log(err)};
});



router.get("/:id", async (req,res) => {
    try {
        const eachMovie = await MovieModel.findById(req.params.id).populate("cast");
        console.log(eachMovie);
        res.render("movies/movie-details", {eachMovie});
    }
    catch (err) {
        console.log(err)};
});

// router.post("/:id/delete", async (req,res,next) => {
//     const {id} = req.params;
//     try {
//         await MovieModel.findByIdAndRemove(id)
//         // console.log(eachMovie);
//         res.redirect("movies/movies");
//     }
//     catch (err) {
//         console.log(err)};
// });

router.post('/:id/delete', (req, res, next) => {
    const { id } = req.params;
    MovieModel.findByIdAndDelete(id)
    .then(() => res.redirect('/movies/movies'))
    .catch(error => next(error));
    });




    router.get("/:id/edit", async (req,res) => {
        try {
            const eachMovie = await MovieModel.findById(req.params.id);
            const celebrities = await CelebrityModel.find();
            console.log(eachMovie,celebrities);
            res.render("movies/edit-movie", {eachMovie, celebrities});
        }
        catch (err) {
            console.log(err)};
    });

    router.post("/:id/edit", async (req,res) => {
        try {
            const {id} = req.params;
            const editedMovie = await MovieModel.findByIdAndUpdate(id,req.body, {new:true});
            res.redirect(`/movies/${editedMovie._id}`);
        }
        catch (err) {
            console.log(err);
            res.redirect("/movies/movie-details")};
    });


module.exports = router;



