// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/", (req, res) => {
    Celebrity.find()
    .then((allCelebrities) => {
        res.render("celebrities/celebrities", { allCelebrities })
    })
    .catch(err => console.log(err))
})

router.get("/create", (req, res) => {
        res.render("celebrities/new-celebrity")
})

router.post("/create", (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body
  
    Celebrity.create({ name, occupation, catchPhrase })
      .then(createdCelebrity => {
        console.log(createdCelebrity)
        res.redirect("/celebrities")
      })
      .catch(() => {
        res.render("new-celebrity")
      })
  })

module.exports = router;