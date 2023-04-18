// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// Creating GET and POST rout for adding a new celebrity
router.get("/celebrities/create", (req, res, next) => {
      res.render("celebrities/new-celebrity")
      .catch((err) => next(err));
});

router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;

    Celebrity.create({name, occupation, catchPhrase})
        .then(() => {
            res.redirect('/celebrities');
        })
        .catch(err => {
            res.render('/celebrities/new-celebrity', { errorMessage: 'There was an error creating the celebrity. Try again!'});
        });
})

// Creating the GET routes for taking the celebrity from the DB
router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
    .then((celebritiesFromDB) => {
        console.log(celebritiesFromDB)
        res.render("celebrities/celebrities", { celebrities: celebritiesFromDB })
    })
    .catch((err) => next(err));
})

module.exports = router;