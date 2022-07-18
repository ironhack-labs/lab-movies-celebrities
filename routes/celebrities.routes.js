const router = require("express").Router();
const Celeb = require("../models/Celebrity.model.js");
// const { route } = require("./index.js");

// all your routes here

router.get("/celebrities/create", (req, res) => {
	res.render("celebrities/new-celebrity.hbs");
});

router.post("/celebrities/create", (req, res) => {
	const { name, occupation, catchPhrase } = req.body;

	Celeb.create({
		name,
		occupation,
		catchPhrase,
	})
		.then((celeb) => {
			res.redirect("/celebrities");
		})
		.catch((err) => res.render("/celebrities/new-celebrity.hbs"));
});

router.get("/celebrities", (req, res) => {
	Celeb.find({})
		.then((celebs) => {
			console.log(celebs);
			res.render("celebrities/celebrities.hbs", { celebs: celebs });
		})
		.catch((err) => console.log(err));
});

module.exports = router;
