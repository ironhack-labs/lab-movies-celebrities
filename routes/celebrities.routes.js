// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const CelebrityModel = require("../models/Celebrity.model")

// CREATE: display form to create new celebrity
router.get("/celebrities/create", (req, res, next) => {
	res.render("celebrities/new-celebrity")
})

// CREATE: process form
router.post("/celebrities/create", (req, res, next) => {
	const {name, occupation, catchPhrase} = req.body
	const newCelebrity = {name, occupation, catchPhrase}
	CelebrityModel.create(newCelebrity)
		.then((cebrityFromDB) => {
			console.log(cebrityFromDB)
			res.redirect("/celebrities")
		})
		.catch(e => next(e))
})

// READ: list celebrities
router.get("/celebrities", (req, res, next) => {
	CelebrityModel.find()
		.then((celebritiesFromDB) => {
			res.render("celebrities/celebrities", {celebrities: celebritiesFromDB})
		})
		.catch(e => next(e))
})

module.exports = router;