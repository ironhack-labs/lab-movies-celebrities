// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
const Celebrity = require('../models/Celebrity.model.js')

// In the routes file (routes/celebrities.routes.js) create the following GET route: /celebrities/create
// In that route we have to render the celebrities/new-celebrity view
router.get('/celebrities/create', (req, res, next) =>{
res.render('celebrities/new-celebrity');
});

// Create the /celebrities/create POST route in routes/celebrities.routes.js.
router.post('/celebrities/create', (req, res, next) => {
    console.log(req.body);
    // const newCeleb ={
    //     name: req.body.name,
    //     occupation: req.body.occupation,
    //     catchPhrase: req.body.catchPhrase
    // }

const {name, occupation, catchPhrase} = req.body

    Celebrity.create({name, occupation, catchPhrase})
    .then(celebFromDB => 
        console.log(`new celebrity created: ${celebFromDB.name}`))
        .then(() => res.redirect('/celebrities'))
        // If there is an error, render the celebrities/new-celebrity view so the user can try again and
        // If there is no error, redirect to the page with the list of celebrities. This route will be created in the next iteration /celebrities
        .catch((err) =>{
            res.render('celebrities/new-celebrity')
            next(err);
        })
    });

module.exports = router;