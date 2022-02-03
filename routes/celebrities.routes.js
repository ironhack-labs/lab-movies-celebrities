// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");



// all your routes here

// ***** CREATE ROUTES *****

// GET '/celebrities/create' route to show celebrity creation form to the user
router.get('/create', (req, res, next) => {
   
    res.render('celebrities/new-celebrity.hbs'); // in res.render() we never start with '/'. Physical path to hbs file
  });

// POST '/celebrities/create' route to create a new celebrity in the DB
router.post('/create', (req, res, next) => {
    console.log(req.body);

  const { name, occupation , catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })

.then(() => res.redirect('/celebrities'))
.catch((err) => {
  console.log(err);
  res.render("celebrities/new-celebrity.hbs");
});
});


// ***** READ ROUTES *****

// GET '/celebrities' to show all celebrities in a list
router.get("/", (req, res, next) => {
  Celebrity.find()
    .then((allCelebrities) =>
      res.render("celebrities/celebrities.hbs", { allCelebrities })
    )
    .catch((err) => next(err));
});


module.exports = router;

