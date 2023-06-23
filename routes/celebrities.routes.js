// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();


//ITERATION 3

// all your routes here

const Celebrity = require('../models/Celebrity.model');

router.get('/celebrities/create', (req, res) =>{
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res) => {

    const {name, occupation, catchPhrase} = req.body;

    // Create a new celebrity using the provided data
    const newCelebrity = new Celebrity ({
        name: name,
        occupation: occupation,
        catchPhrase: catchPhrase
    });

    // Save the new celebrity to the database
    newCelebrity
        .save()
        .then (celeb => 
            // Redirect to the celebrities page after successful creation
            res.redirect('/celebrities')
        )
        .catch(err => {
            // Handle the error and render the new-celebrity view again
            res.render('celebrities/new-celebrity', 
            { error: "please, try again to insert a new celebrity" });
        });
});

//ITERATION 3 (END)


// ITERATION 4

router.get('/celebrities', (req,res) => {

    Celebrity.find()
        .then((celebrities)=>{
            res.render('./celebrities/celebrities', {celebrities});
        })
        .catch(() => console.log("error fetching celebrities"))
});

// ITERATION 4 (END)


module.exports = router;