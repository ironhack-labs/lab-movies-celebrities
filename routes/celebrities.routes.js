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

router.get('/celebrities/:id', (req, res, next) => {
	const celebrityToDetail = req.params.id;
	Celebrity.findById (celebrityToDetail)
	//https://mongoosejs.com/docs/populate.html
		.then (celeb => {
			res.render ("celebrities/celebrity-detail", celeb)
		})
	
		.catch((error) => console.log('Error while showing the celebrity details: ', error));
});

router.post('/celebrities/:id/delete', (req, res, next) => {
	const celebToDelete = req.params.id;
	Celebrity.findByIdAndDelete(celebToDelete)
		.then( (whatever) => {
			res.redirect('/celebrities')
		})
		.catch((error) => console.log('Error while deleting the celebrity: ', error));

})

router.get('/celebrities/:id/edit', (req, res, next) => {
	const celebToDetail = req.params.id;
	Celebrity.findById (celebToDetail)
		.then ((celeb) => {
			res.render ("celebrities/edit-celebrity.hbs", celeb)
		})
		.catch((error) => console.log('Error while editing the celebrity: ', error));
});

router.post('/celebrities/:id/edit', (req, res) => {
	console.log("hey!")
	const celebToEdit = req.params.id;
	const { name, occupation, catchPhrase} = req.body;
	Celebrity.findByIdAndUpdate(celebToEdit, { name, occupation, catchPhrase})
		.then((whatever) => res.redirect(`/celebrities/${celebToEdit}`))
		.catch((error) => {
			console.log('Error while editing the celebrity', error);
		});
});

module.exports = router;