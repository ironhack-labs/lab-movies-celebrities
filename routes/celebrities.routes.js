const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")

router.get("/celebrities/create", (req, res, next) => {
    Celebrity.find()
        .then(celebritiesFromDB => {
            const data = {
                celebrities: celebritiesFromDB
            }

            res.render("celebrities/new-celebrity", data)
        })
        .catch(e => {
            console.log("An error has occured while creating a celebrity", e)
            next(e)
        })
})

router.post("/celebrities/create", (req, res, next) => {
    const newCelebrity = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }

    Celebrity.create(newCelebrity)
    .then((newCelebrity) => {
        res.redirect("/celebrities")
    })
    .catch(e => {
        console.log("An error has occured while creating a celebrity", e)
        next(e)
    })
})

router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
    .then(celebritiesFromDB => {
        const data = {
            celebrities: celebritiesFromDB,
        }
        res.render("celebrities/celebrities", data)
    })
    .catch(e => {
        console.log("An error has occured while getting the list of celebrities", e)
        next(e)
    })
})

module.exports = router;