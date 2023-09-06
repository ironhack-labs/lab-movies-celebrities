// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const { reset } = require("nodemon");
const Celebrities = require('../models/Celebrity.model')

// GET route to display the form to add new celeb.
router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity.hbs')
})
// POST route to save new celeb. to DB
router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrities.create({ name, occupation, catchPhrase })
        .then(celebFromDB => {
            // console.log(`New celeb created: ${celebFromDB.name}.`);
            res.redirect('/celebrities');
        })
        .catch(error => res.render('celebrities/new-celebrity'));
});
// GET route to retrieve and display all the celebs
router.get('/celebrities', (req, res) => {
    Celebrities.find()
        .then(allCelebs => {
            // console.log("All celebs in DB:", allCelebs)
            res.render('celebrities/celebrities.hbs', { celebs: allCelebs })
        })
        .catch(error => next(error));
}
);


module.exports = router;