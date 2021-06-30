// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/create-movie",async (req, res) => {
    const allCelebrities = await Celebrity.find();
    res.render("movies/new-movie.hbs", {allCelebrities});
});
  
router.post("/create-movie", async (req, res) => {
    try{
        const { title, genre, plot, cast } = req.body;
        await Movie.create({
            title,
            genre,
            plot,
            cast,
        });
        res.redirect("/create-movie");
    } catch (e){
        console.log(e);
        res.redirect("/create-movie");
    }
});
  
module.exports = router;
