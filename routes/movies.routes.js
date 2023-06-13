const router = require("express").Router();
const Celebrity = require ("../models/Celebrity.model");
const Movie = require ("../models/Movie.model");

// all your routes here
router.get("/create", (req, res, next) => {
    Celebrity.find().then(allCelebrity => {
        res.render('movies/new-movies',{celebrity: allCelebrity})
    })
    
}) 

router.post("/create",(req, res, next) =>{
    const {title, genre, plot, cast} = req.body

    Movie
    .create({ title, genre, plot, cast})
    .then(() => res.redirect("/movies"))
    .catch(err => console.log('Error @ POST /craete:', err))
})  


module.exports = router;