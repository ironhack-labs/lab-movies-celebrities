const Celebrity = require("../models/Celebrity.model")
const Movie = require("../models/Movie.model")

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router()

// all your routes here

router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity.hbs")
})

router.post("/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body

  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.redirect("/celebrities"))
    .catch((err) => {
      res.redirect("/celebrities/new-celebrity")
      console.log(`Error while saving new celebrity: ${err}`)
    })
})

router.get("/", (req, res) => {
  Celebrity.find()
    .then((celebritiesFromDB) => {
      res.render("celebrities/celebrities.hbs", {
        celebrities: celebritiesFromDB,
      })
    })
    .catch((err) =>
      console.log(`Error while looking for celebrities in the DB: ${err}`)
    )
})

module.exports = router
