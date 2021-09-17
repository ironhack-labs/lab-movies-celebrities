/** @format */

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here
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

router.get("/celebrities", (req, res, next) => {
	Celebrity.find()
		.then((allCelebrities) => {
			res.render("celebrities/celebrities", {
				celebrities: allCelebrities,
			});
		})
		.catch(error);
});

// router.post("/add", (req, res, next) => {
// 	const { name, occupation, catchphrase } = req.body;
// 	const newCelebrity = new Celebrity({ name, occupation, catchphrase });
// 	newCelebrity
// 		.save()
// 		.then((celebrity) => {
// 			res.redirect("/celebrities");
// 		})
// 		.catch((error) => {
// 			res.render("celebrities/new-celebrity");
// 		});
// });
module.exports = router;
