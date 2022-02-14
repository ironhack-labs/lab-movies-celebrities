// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');

// all your routes here
router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
            .then(resFromDB => {
                console.log("Celebrities retrieved", resFromDB);
                res.render('celebrities/celebrities', { celebrities: resFromDB } );
            })
            .catch(err => {
                console.log("Error while finding the Celebrites", err);
            });
});

router.get('/celebrities/create', (req , res , next) => {
    res.render('celebrities/new-celebrity');
});

router.post('/celebrities/create', (req , res , next) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.create({ name, occupation, catchPhrase })
        .then( resFromDB => {
            console.log("Celebrity created", resFromDB);
            res.redirect('/celebrities');
        })
        .catch(err => {
            console.log("Error while creating a new Celebrity", err);
            res.redirect('/celebrities/create?error=true');
        });
});

module.exports = router;