const router = require("express").Router();

const Celebrity = require("./../models/Celebrity.model");

// Celebrities list
router.get("/", (req, res) => {
	Celebrity.find()
		.then((celebrity) => {
			res.render("celebrities/celebrities", { celebrity });
		})
		.catch((err) => console.log(err));
});

// Celebrities creation
router.get("/create", (req, res) => {
	res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res) => {
	const { name, occupation, catchPhrase } = req.body;

	Celebrity.create({ name, occupation, catchPhrase })
		.then(() => {
			res.redirect("/celebrities");
		})
		.catch((err) => console.log(err));
});

// Celebrities deletion
router.post("/:celeb_id/delete", (req, res) => {
	const { celeb_id } = req.params;

	Celebrity.findByIdAndRemove(celeb_id)
		.then(() => res.redirect("/celebrities"))
		.catch((err) => console.log(err));
});

// Celebrities edit
router.get("/:celeb_id/edit", (req, res) => {
	const { celeb_id } = req.params;

	Celebrity.findById(celeb_id).then((celebrity) => {
		res.render("celebrities/edit-celebrities", celebrity);
	});
});

router.post("/:celeb_id/edit", (req, res) => {
	const { celeb_id } = req.params;
	const { name, occupation, catchPhrase } = req.body;

	Celebrity.findByIdAndUpdate(celeb_id, { name, occupation, catchPhrase })
		.then(() => res.redirect("/celebrities"))
		.catch((err) => console.log(err));
});

module.exports = router;
