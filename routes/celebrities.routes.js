const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

router.get("/create", (req, res) => {
    res.render("celebrities/new-celebrity");
})

router.post("/create", (req, res) => {
    const { name, occupation, catchPhrase } = req.body;
  
    Celebrity.create({ name, occupation, catchPhrase })
      .then(celeb => res.render("index", celeb))
      .catch(err => console.log(err))
})

router.get("/celebrities", (req, res, next) => {

    Celebrity.find()
      .then(allCelebs => res.render("celebrities/celebrities", { allCelebs }))
      .catch(err => console.log(err))
});


module.exports = router;
