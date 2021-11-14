const router = require("express").Router();
const Celebrity = require("../models/celebrity.model")
// all your routes here
// In the routes file (routes/celebrities.routes.js) create the following GET route: /celebrities/create
router.get("/celebrities/create", (req, res) => {
    // In that route we have to render the celebrities/new-celebrity view
        res.render("celebrities/new-celebrity");
    }),

    // Create the /celebrities/create POST route in routes/celebrities.routes.js.
router.post("/celebrities/create", (req, res) => {
        const {name, occupation, catchPhrase } = req.body;
    // In that route we have to create an instance of the Celebrity model (don't forget, we should get all the info from the form through req.body)
    
    Celebrity.create ({name, occupation, catchPhrase})
        .then ((Celebrity) => {
            // If there is an error, render the celebrities/new-celebrity view so the user can try again and
            res.redirect("/celebrities", Celebrity); })
            // If there is no error, redirect to the page with the list of celebrities. This route will be created in the next iteration /celebrities
            .catch(() => res.render("celebrities/new-celebrity"));
    
        });












// Create the /celebrities GET route in routes/celebrities.routes.js.
// In the route:
router.get("/celebrities", (req, res) => {
        // Use find() method on the Celebrity model to retrieve all the celebrities
        Celebrity.find()
        // If everything is okay, render the celebrities/celebrities.hbs view and pass the array of celebrities into the view as a variable
        .then(Celebrity => res.render("celebrities/celebrities", {Celebrity}))
        .catch(err => console.log(err))
    }),





module.exports = router;