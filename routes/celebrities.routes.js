// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

//added
const Celebrity = require("../models/Celebrity.model.js");

// all your routes here

router.get("/celebrities/create", (req, res) =>
  res.render("celebrities/new-celebrity.hbs")
);

router.post("/celebrities/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then((celebrityFromDB) => res.redirect("/celebrities"))
    .catch(error => {
        // If there's an error, render the form again with an error message
        res.render('celebrities/new-celebrity', { error: 'Error creating celebrity.' });
      });
});

router.get('/celebrities', (req, res)=> {
    Celebrity.find()
    .populate()
    .then((celebrityFromDB) => {
        console.log("Celebrity from DB:", celebrityFromDB)
        res.render("celebrities/celebrities", {celebrity: celebrityFromDB })
    })
    .catch((err) => {
        console.log(`Err while getting the celebrity from the DB: ${err}`);
        next(err);
      });
})

module.exports = router;
