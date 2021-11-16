// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");



router.get("/celebrities", (req, res, next) => {
    
    Celebrity.find(() => {}) 
     .then((foundCelebs) => {
      res.render("celebrities/celebrities-view", { celebsList: foundCelebs});
    })
    .catch((err)=> {
        console.log(err);
    })
    
  });

// all your routes here

router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity.hbs")
  });

router.post("/celebrities/create", (req, res) => {
    const { name, occupation, catchPhrase } = req.body;

    Celebrity.create({ name, occupation, catchPhrase})
        .then((createdCeleb) => {
            res.redirect("/celebrities")
        })
        .catch((err)=> {
            console.log(err);
            res.render("celebrities/new-celebrity.hbs")
        })
})


module.exports = router;