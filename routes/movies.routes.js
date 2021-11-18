const router = require("express").Router();

//Models
const Movie = require('../models/Movie.model.js')



//Ruta base a Movies
router.get("/", async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.render("../views/movies/movies.hbs", {movies});
    } catch {
        res.render("./create", { errorCreation: err})
    }
});

// GET create new movie 
router.get("/create", (req, res) => {
    res.render("../views/movies/new-movie.hbs");
});

// POST create new movie
router.post("/create", async (req, res)=>{
    const {title, genre, plot, cast} = req.body;
    try{
        await Movie.create(req.body)
        res.redirect("./")
        }catch(err){
        res.render("./create", { errorCreation: err})
        }
    
    })


module.exports = router;