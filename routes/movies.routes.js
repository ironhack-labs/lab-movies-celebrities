// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movies.model");

/* GET movies page */
router.get("/movies/create", (req, res) => {
    Celebrity.find()
        .then(celebritiesList => {
            res.render("movies/new-movie", { celebritiesList })
            console.log("celebritiesList", celebritiesList);
        })
        .catch(error => {
            console.log(error);
        })
})

router.post("/movies/create", (req, res) => {
    const newMovie = req.body;
    console.log(newMovie);
    Movie.create(newMovie)
        .then((newMovie) => {
            res.redirect("/movies");;
        })
        .catch(error => {
            console.log(error);
        })
})

router.get("/movies", (req, res) => {
    Movie.find()
        .populate("cast")
        .then(foundedMovie => {
            res.render("movies/movies", { foundedMovie: foundedMovie });
        })
        .catch(error => {
            console.log(error);
        })
})

router.get("/movies/:id", (req, res, next) => {
    const { title, genre, plot, cast } = req.params.id
    console.log("req.params.id", req.params.id);
    Movie.findById({ title, genre, plot, cast })
        .populate("cast")
        .then((thatIid) => {
            res.render("movies/movie-details", { thatId: thatIid });
        })
        .catch((err) => { console.log(err); })
})

router.post("/movies/:id/delete", (req, res) => {
    const { title, genre, plot, cast } = req.params.id
    Movie.findByIdAndRemove({ title, genre, plot, cast })
        .then((removed) => {
            res.render("movies/movie-details", { removed: removed })
        })
        .catch((err) => { console.log(err); })
})

router.get("/movies/:id/edit", (req, res) => {
    const { title, genre, plot, cast } = req.params.id
    console.log("req.params.id", req.params.id);
    Movie.findById({ title, genre, plot, cast })
        .then(someMovie => {
            Celebrity.find()
                .then(someCelebrity => {
                    someMovie.cast.forEach(theCast => {
                        if (someCelebrity._id.equals(theCast)) {
                            theCast.isInCast = true;
                        }
                    })
                })
            res.render("movies/edit-movie", { movie: someMovie, someCelebrity });
        })
        .catch((err) => { console.log(err); })
})

router.post("/movies/:id/edit", (req, res) => {
    Movie.findByIdAndUpdate(req.params.movieId, req.body)
        .then(updatedMovie => {
            res.redirect("/movies/:id/edit");
        })
        .catch((err) => { console.log(err); })

})

router.get("/movies/:id", (req, res, next) => {
    const { title, genre, plot, cast } = req.params.id
    console.log("req.params.id", req.params.id);
    Movie.findById({ title, genre, plot, cast })
        .populate("cast")
        .then((thatIid) => {
            res.render("movies/movie-details", { thatId: thatIid });
        })
        .catch((err) => { console.log(err); })
})

module.exports = router;