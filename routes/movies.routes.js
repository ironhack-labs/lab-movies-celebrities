const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");


// all your routes here
/* router.get("/movies/create", async (req, res, next) => {
	try {
		const celebrities = await Celebrity.find();
		res.render("movies/new-movie.hbs", { celebrities });
	} catch (error) {
		next(error);
	}
}); */
router.get("/movies/create", (req, res, next) => {
    
    Celebrity.find()
   .then( (celebsFromDB) => {
    const data = {
        celebs: celebsFromDB,
    }
    res.render("movies/new-movie", data)
   })
    
})
 
router.post("/movies/create", (req, res, next) =>{
    
    const newMovie = {
        title: req.body.title,
        genre: req.body.genre, 
        plot: req.body.plot,
        cast: req.body.cast
    };

    Movie.create(newMovie)
        .then((newMovie)=>{             
            res.redirect("/movies")
        })
        .catch( e => {
          //  res.render("/movies/new-movie")
            next(e);
        });

})

module.exports = router;