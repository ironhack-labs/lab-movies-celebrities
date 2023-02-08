const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model")



router.get("/movies", (req, res, next) => {
  Movie.find()
            .then(x => {
              console.log(x)
              res.render("movies/movies", {movies : x})
              })
              .catch(err => next(err))
})


router.get("/movies/create", (req, res, next) => {
	res.render("movies/new-movie")

	Celebrity.find()
		.then(celebritiesFromDB => {
			console.log(options)
			res.render("movies/create", { celebrities: celebritiesFromDB })
		})
		.catch(err => next(err))
})


router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast} = req.body

  Movie.create({ title, genre, plot, cast})
  .then(createdMovie => {
    console.log(createdMovie)
    
    res.redirect("/movies")
  
  })
  .catch(err => {
    next(err)
  res.render("movies/new-movie")})
});  


module.exports = router;