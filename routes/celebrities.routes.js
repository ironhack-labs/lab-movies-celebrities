// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/create", (req, res, next) => {
    res.render("./celebrities/new-celebrity")
})

router.post("/create", (req,res,next) => {
    console.log(req.body)
    let newCelebrity = {
        name, occupation, catchPhrase
    } = req.body
    Celebrity.create(newCelebrity)
    .then(response => {
        res.redirect("/celebrities")
    })
    .catch(err => {
        console.log(err)
        res.render("./celebrities/new-celebrity")

    })
})

router.get("/", (req,res,next)=>{
    res.render("./celebrities/celebrities")
})

module.exports = router;