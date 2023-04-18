// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

// create  GET and POST route to create a new celebrity
router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrities")
    .catch((err) => next(err));
});

router.post('/celebrities/create', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({name, occupation, catchPhrase})
      .then(() => {
          res.redirect('/celebrities');
      })
      .catch(err => {
          res.render('/celebrities/new-celebrities', { errorMessage: 'There was an error creating the celebrity. Try again!'});
      });
})

//create GET route to get celebrities from DB
router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
    .then((celebritiesFromDB) => {
        console.log(celebritiesFromDB)
        res.render("celebrities/celebrities", { celebrities: celebritiesFromDB })
    })
    .catch((err) => next(err));
})


module.exports = router;