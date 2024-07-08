// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

module.exports = router;

// create the following GET route: /celebrities/create
// render the celebrities/new-celebrity view
router.get("/create", (req, res) => {
    res.render("celebrities/new-celebrity");
});

// // create the following POST route: /celebrities/create
// In that route we have to create an instance of the Celebrity model (don't forget, we should get all the info from the form through req.body)
// If there is an error, render the celebrities/new-celebrity view so the user can try again and
// If there is no error, redirect to the page with the list of celebrities. This route will be created in the next iteration of /celebrities

router.post("/create", (req, res) => {
    const { name, occupation, catchphrase } = req.body;
    Celebrity.create({ name, occupation, catchphrase })
        .then(() => {
            res.redirect("/celebrities");
        })
        .catch(() => {
            res.render("celebrities/new-celebrity");
        });
});

// Create the /celebrities GET route
// In that route we have to find all the celebrities in the database and render the celebrities/index view and pass the array of celebrities into the view as a variable
// if there is an error, catch it

// GET route to retrieve all celebrities
router.get('/celebrities', async (req, res) => {
    try {
        const celebrities = await Celebrity.find(); // Using find() method on the Celebrity model
        res.render('celebrities/celebrities', { celebrities }); // Rendering the view and passing the array of celebrities
    } catch (error) {
        console.error(error);
        // Handle errors as needed
    }
});


