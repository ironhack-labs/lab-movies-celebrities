const Celebrities = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
router.get("/", (req, res, next) => {
    res.render("index");

});

// Route to create a new celebrity form

router.get("/celebrities/create", (req, res, next) => {

    res.render("celebrities/new-celebrity")

})

// Route to post the new celebrity form on to the webpage

router.post("/celebrities/create", (req, res, next) => {
    // var { name, occupation, catchPhrase } = req.body
    // Celebrities.create({ name, occupation, catchPhrase })
    //     .then(createdCelebrity => {
    //         console.log(req.body)
    res.render("celebrities/celebrities")
    //     })
    //     .catch(err => next(res.render("celebrities/new-celebrity")))
    // console.log("Error")
})

// Route to get and list celebrities

router.get("/celebrities", (req, res, next) => {
    Celebrities.find()
        .then(celebrityInfo => {
            console.log(celebrityInfo)
            res.render("celebrities/celebrities", { celebrity: celebrityInfo })
        })
})


module.exports = router;