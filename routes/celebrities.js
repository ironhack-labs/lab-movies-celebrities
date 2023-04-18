const router = require("express").Router();
const Celebrity = require("../models/Celebrity")
const Movie = require("../models/Movie")

router.get("/celebrity", (req, res, next) => {
    Celebrity.find()
    .then(celebritiesFromDb => {
        console.log(celebritiesFromDb)
    res.render("celebrities/index", { celebrities: celebritiesFromDb})
    })
    .catch(err => next(err))
})

module.exports = router;