// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
// Iteration #3: Adding New Celebrities
const Celebrity = require('../models/Celebrity.model.js');

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity');
});

router.post('/celebrities/create', (req, res, next) => {
    const newCelebrity = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }

    Celebrity.create(newCelebrity)
    .then(() => {
        res.redirect('/celebrities')
    })
    .catch((error) => {
        res.render('celebrities/new-celebrity.hbs');
        console.log(error);
    })
});

// Iteration #4: Listing Our Celebrities
router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
    .then((celebrities) => {
        res.render('celebrities/celebrities.hbs', {celebrities});
   })
    .catch((error) => {
        console.log(error);
    })
});



module.exports = router;