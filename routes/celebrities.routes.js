/** @format */

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here
// router.get("/index", (req, res, next) => { //HAy que ponerlo???????
// 	res.render("/", index);
// });
router.get("/create", (req, res, next) => {
	res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res, next) => {
	const { name, occupation, catchPhrase } = req.body;

	Celebrity.create({ name, occupation, catchPhrase })
		.then((createdCelebrity) => {
			console.log(createdCelebrity);
			res.redirect("/celebrities");
		})
		.catch((error) => {
			console.log("Error creating a new Celebrity", error);
			res.render("celebrities/new-celebrity");
		});
});

router.get("/", (req, res, next) => {
	Celebrity.find().then((allCelebrities) => {
		res.render("celebrities/celebrities", {
			celebrities: allCelebrities,
		});
	});
	// .catch(error);
});

module.exports = router;
