// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")

// all your routes here

// CREATE: create new celebrity
router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity");
})

// POST: create new celebrity
router.post("/celebrities/create", (req, res, next) => {
    Celebrity.create(req.body)
    .then(() => {res.redirect("/celebrities")})
    .catch((e) => res.render("celebrities/new-celebrity"))
})

// GET: display all celebrities
router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
    .then((result) => {
        res.render("celebrities/celebrities", {celebrities: result})
    })
    .catch((e) => console.log("could not get celebrity list " + e))
})


module.exports = router;