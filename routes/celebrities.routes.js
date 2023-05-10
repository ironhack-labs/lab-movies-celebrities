// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// require celebrity Model
const Celebrity = require("../models/Celebrity.model.js");

// all your routes here

// GET route to display the form to create celebrity
router.get("/celebrities/create", (req, res) => {
	res.render("celebrities/new-celebrity.hbs");
});

// POST route to save a new celebrity to the database
router.post("/celebrities/create", (req, res) => {
	console.log(req.body); // direct connection between client and server

	// destructuring the req.body object
	const { name, occupation, catchPhrase } = req.body;

	async function createCelebrityInDb() {
		try {
			// creating the celebrity in Db
			let createdCelebrity = await Celebrity.create({
				name,
				occupation,
				catchPhrase,
			});

			// feedback regarding the celebrity created in Db
			console.log(`New celebrity created: ${createdCelebrity.name}`);

			// redirects to celebrities page once book is created
			res.redirect("/celebrities");
		} catch (error) {
			console.log(error);
            res.redirect("celebrities/new-celebrity.hbs")
		}
	}
	createCelebrityInDb();
});

// GET route to retrieve and display all the celebrities
router.get("/celebrities", (req, res) => {
	async function findAllCelebritiesFromDb() {
		try {
			// Find all the celebrities inside the collection
			let allCelebrities = await Celebrity.find();

			// Feedback regarding to found books
			console.log("Retrieved celebrities from DB:", allCelebrities);

			// Render all books from DB with HBS view
			res.render("celebrities/celebrities.hbs", { celebrities: allCelebrities });
		} catch (error) {
			console.log(error);
		}
	}
	findAllCelebritiesFromDb();
});


module.exports = router;