const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/", (req, res) => {
    res.render("movies/movies");
});

router.get("/create", (req, res) => {
    Celebrity.find()
    .then((allCelebsArr) => {
        res.render("movies/new-movie", {celebrities: allCelebsArr});
    })
    .catch((err) => {
        console.log("Error getting Celebrities from DB: ", err);
    });
});

router.post("/create", (req, res) => {
    const {title, genre, plot, cast : castNames} = req.body;
    Celebrity.find({"name": {$in: castNames}})
    .then((castInfoArr) => {
        const cast = castInfoArr.map(star => star._id);
        return Movie.create({title, genre, plot, cast});
    })
    .then(() => res.redirect("/movies"))
    .catch((err) => {
        console.log("Error adding Movie to DB: ", err);
    })
});

module.exports = router;