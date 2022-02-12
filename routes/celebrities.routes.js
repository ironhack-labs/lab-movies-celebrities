// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');

// all your routes here
router.get('/celebrities', (res, req, next) => {
    Celebrity.find()
            .then(resFromDB => {
                console.log("Celebrities retrieved", resFromDB);
                req.render('celebrities/celebrities', { celebrities: resFromDB } );
            })
            .catch(err => {
                console.log("Error while finding the Celebrites", err);
            });
});

router.get('/celebrities/create', (res , req , next) => {
    req.render('celebrities/new-celebrity');
});

router.post('/celebrities/create', (res , req , next) => {
    const { name, occupation, catchPhrase } = res.body;
    Celebrity.create({ name, occupation, catchPhrase })
        .then( resFromDB => {
            console.log("Celebrity created", resFromDB);
            req.redirect('/celebrities');
        })
        .catch(err => {
            console.log("Error while creating a new Celebrity", err);
            req.redirect('/celebrities/new-celebrity?error=true');
        });
});

module.exports = router;