const router = require("express").Router();   
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

  

router.get("/movies", (req, res) => {
    Movie
        .find()
        .select("title")
        .select("title")
        .then((movies) => {
            res.render("./movies/movies", { movies });
        })
        .catch((err) => console.log(err));
});



router.get("/movies/create", (req, res) => {
    Celebrity
        .find()
        .select("name")
        .then((celebrities) => {
            res.render("./movies/new-movie", { celebrities });
        })
        .catch((err) => console.log(err));
}); 



router.post("/movies/create", (req, res) => {
    const { title, genre, plot, cast } = req.body;

    Movie
        .create({ title, genre, plot, cast })
        .then((movies) => {
            res.redirect("/movies");
        })
        .catch((err) => console.log(err));
}); 

router.get("/movies/details/:id", (req, res) => {
    const { id } = req.params;

    Movie
        .findById(id)
        .populate("cast")
        .then((movie) => {
            res.render("./movies/movie-details", movie);
        })
        .catch((err) => console.log(err));
});


router.post("/movies/:id/delete", (req, res) => {
    const { id } = req.body;

    Movie
        .deleteOne({ id_: id })
        .then(() => {
            res.redirect("/movies");
        })
        .catch((err) => console.log(err));
});




module.exports = router;