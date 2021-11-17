const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')
// all your routes here

//GET route
router.get("/movies/create", async (req, res) => {
    try {
        const allCelebrities = await Celebrity.find({})
        //console.log(allCelebrities)
        res.render("./movies/newMovie", {allCelebrities})
    }catch (err){
        console.log(err)
    }
})

//POST route (when the form is filled )

router.post("/movies/create", async (req, res) => {
    const {title, genre, plot, cast} = req.body
    
    try {
        const createdMovie = await Movie.create({title, genre, plot, cast})
        console.log(createdMovie)
        if(createdMovie) {
            res.render("./movies/movies");
        }else {
            res.render("./movies/newMovie", {errMsg: "There is an error creating a new celebrity. Please try again"})
        }
    }catch (err) {
        console.log(err)
    }
});


module.exports = router;