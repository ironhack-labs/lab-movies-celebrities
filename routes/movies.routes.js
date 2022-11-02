// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const { response } = require("../app");
const Movie = require("../models/movie.model");
// all your routes here

router.get("/create", async (req, res) => {
    console.log("inside")
    res.render("movies/new-movies")
})

router.post("/create", async (req, res) => {
    try{
    const newMovie = await Movie.create(req.body)
    res.redirect('/movies')
    } catch (err) {
        res.render('movies/new-movies')
        console.log('error ceating new movies')
    }
})
router.get('/', async (req, res) => {
    try{
        const mov =  await Movie.find()
        res.render('movies/movies', {mov})
    } catch (err){
        console.log(err)
    }
 });
module.exports = router;