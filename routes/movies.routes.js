const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/movies/create", (req, res) => {
	Celebrity.find()
		.then(celebrities => res.render("movies/new-movie", {celebrities}));
	
})

router.post("/movies/create", (req, res) => {
	console.log(req.body)
	Movie.create(req.body)
		.then(() => res.redirect("/movies"))
		.catch((err) => console.log(err))
})

router.get("/movies", (req, res) => {
	Movie.find()
		.then(movies => res.render("movies/movies", { movies }))
		.catch((err) => console.log(err))
})

router.get("/movies/:id", (req, res) => {
	Movie.findById(req.params.id)
		.populate("cast")
		.then(movie => res.render("movies/movie-details", movie))
})

router.post("/movies/:id/delete", (req, res) => {
	Movie.findByIdAndDelete(req.params.id)
		.then(() => res.redirect("/movies"))
		.catch((err) => console.log(err))
})

router.get("/movies/:id/edit", (req, res) => {
	var celebs
	Celebrity.find()
		.then(allCelebrities => {celebs = allCelebrities
			console.log(celebs)})
	
	Movie.findById(req.params.id)
		.populate("cast")
		.then(movie => {
			movie.cast.forEach(elm => {
				celebs.forEach((celeb, index)=> {
					if(elm.name === celeb.name) {
						celebs.splice(index, 1);
					}
				})
			})
		res.render("movies/edit-movie", { movie, celebs})})
		.catch((err) => console.log(err))
})

router.post("/movies/:id/edit", (req, res) => {
	const {title, genre, plot, cast} = req.body;
	const id = req.params.id;
	Movie.findByIdAndUpdate(req.params.id, {title, genre, plot, cast}, {new: true})
		.then((updated) => {
			console.log(updated)
			res.redirect("/movies/" + id)})
})


module.exports = router;