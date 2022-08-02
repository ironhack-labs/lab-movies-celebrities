const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

router.get("/celebrities/create", (req, res, next) =>
	res.render("celebrities/new-celebrity")
);

router.post("/celebrities/create", (req, res, next) => {
	const { name, occupation, catchPhrase } = req.body;

	Celebrity.create({ name, occupation, catchPhrase })
		.then((createCelebrity) => {
			console.log(`${createCelebrity}`);
			res.redirect("/");
		})
		.catch((err) => res.render("/celebrities/new-celebrity"));
});

module.exports = router;
