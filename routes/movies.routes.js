// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/movies/create", (req, res, next) => {

    Celebrity.find()
        .then((celebritiesArr) => {

            res.render("movies/new-movie", { celebrities: celebritiesArr });
        }).catch((err) => {
            
        });
});


router.post("/movies/create", (req, res, next) => {
    console.log(req.body);
    res.redirect("/");
});

module.exports = router;