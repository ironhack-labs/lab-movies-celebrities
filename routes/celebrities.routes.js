const router = require("express").Router()
const Celebrity = require("../models/Celebrity.model.js")

router.get("/celebrities/create", (req, res) => {
	res.render("celebrities/new-celebrity")
})

router.post("/celebrities/create", (req, res) => {
	const { name, occupation, catchPhrase } = req.body

	Celebrity.create({ name, occupation, catchPhrase })
		.then(() => {
			res.redirect("/celebrities")
		})
		.catch(() => {
			res.render("celebrities/new-celebrity")
		})
})

router.get("/celebrities", (req, res) => {
	Celebrity.find().then((allCelebrities) => {
		res
			.render("celebrities/celebrities.hbs", { celebrities: allCelebrities })

			.catch((error) => {
				console.log(error)
			})
	})
})

module.exports = router
