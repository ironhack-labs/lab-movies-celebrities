// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");


// Creating a celebrity
router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
    // .catch((err) => console.log("There was an error returning the page", err))
})

router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.create({ name, occupation, catchPhrase })
    .then(newSavedCelebrity => {
        res.redirect('/celebrities');
    })
    .catch((err) => console.log("There was an error while creating your celebrity", err));
});

// Listing celebrities
router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
    .then(allCelebritiesFromDB => {
        res.render('celebrities/celebrities', { celebrities: allCelebritiesFromDB })
    })
    .catch((err) => console.log('There was an error retrieving the list of celebrities', err))
});


// router.get('/celebrities/, (req, res, next) => {
//     Celebrity.find()
//     .then(allCelebrities => {
//         res.render("celebrities/new-celebrity.hbs", { celebrities: allCelebrities })
//     })
//     .catch(err => console.log("An error occurred while retrieving new celebrity form", err))
// });


module.exports = router;
