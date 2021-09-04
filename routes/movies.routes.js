const router = require("express").Router()
const Celebrity = require("../models/Celebrity.model")
const Movies = require("../models/Movie.model")

router.get("/movies/create", (req, res) => {

    Celebrity
    .find()
    .select("name")
    .then((celebrities) => {
        res.render("./movies/new-movie", {celebrities})
    })
    .catch(err => console.log(err))

})

router.post("/movies/create", (req, res) => {
    const {title, genre, plot, cast} = req.body

    Movies
    .create({title, genre, plot, cast})
    .then(movies => {
        res.redirect("/")
    })
    .catch(err => console.log(err))
})

module.exports = router;