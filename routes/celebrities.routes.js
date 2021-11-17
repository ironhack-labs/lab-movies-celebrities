const app = require("../app");
const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.get("/", (req, res) => {
    const celebrityName = req.query.celebritySearched;
    Celebrity.find({ name: { $regex: celebrityName, $options: "i" } })
    .then((celebrityList) => {
      res.render({ celebrityList })
    })
    .catch( (err) => console.log(err));
})

//  POST      /celebities/create  - Receives the data from the POST form
router.post("/celebrities/create", (req, res) => {
    // req.body; --> Body of the POST HTTP request with the data from the form fields
    // OR
    // const { name, occupation, catchPhrase } = req.body;
    // Book.create( { rating: rating, author: author, title: title } )
    Celebrity.create(req.body)
      .then((createdCelebrity) => {
        // Redirect to the page with the celebrity details
        res.render("celebrities/new-celebrity");
        res.redirect(`celebrities`);
      })
      .catch( (err) => console.log(err));
});

module.exports = router;
