// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('./../models/Celebrity.model')

/* GET celebrities page */
router.get("/celebrities/create", (req, res, next) => res.render("./../views/celebrities/new-celebrities"))













module.exports = router;
/* 
Create the /celebrities/create POST route in routes/celebrities.routes.js.
In that route we have to create an instance of the Celebrity model 
(don't forget, we should get all the info from the form through req.body)
If there is an error, render the celebrities/new-celebrity view so the user can try again and
If there is no error, redirect to the page with the list of celebrities. 
This route will be created in the next iteration /celebrities
In the views/index.hbs view file:
Add a link that goes to the page you just created with the form to create a new celebrity.
 */