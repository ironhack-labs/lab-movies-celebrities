// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");


router.get("/celebrities/create", (req, res) => {
	res.render("celebrities/new-celebrity");
})

router.post("/celebrities/create", (req, res) => {
	console.log(req.body)
	Celebrity.create(req.body)
		.then(() =>res.redirect("/celebrities"))
		.catch(() => res.render("celebrities/new-celebrity"))
})

router.get('/celebrities', (req, res) => {
	Celebrity.find()
	.then(celebrities => res.render("celebrities/celebrities", {celebrities}))
})

module.exports = router;
