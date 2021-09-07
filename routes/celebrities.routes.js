// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require ("../models/Celebrity.model.js")

// all your routes here

router.get("/celebrities", (req, res, next) => {
	Celebrity.find()
		.then (celebrityArray => {
			//console.log ("celeb list: ", celebrityArray);
			res.render ("celebrities/celebrities", {celebrityArray})
		})
		.catch(error => {
			console.log('Error while listing the celebs: ', error);
  });
})

router.get("/celebrities/create", (req, res, next) => {
	res.render("celebrities/new-celebrity");
  });


router.post("/celebrities/create", (req, res, next) => {
	const {name, occupation, catchPhrase} = req.body; 
	Celebrity.create({name, occupation, catchPhrase})
		.then ((createdCeleb) => {
			res.redirect ("/celebrities")
		})
		.catch(error => {
			console.log('Error while creating the celeb: ', error);
			res.redirect ("celebrities/new-celebrity");
		})
});


module.exports = router;