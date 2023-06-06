const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");





router.get("/celebrities/create", (req, res, next) => {
        
            res.render("celebrities/new-celebrity")
    
})

router.post("/celebrities/create", (req, res, next) => {
    const newCelebrity = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }

    Celebrity.create(newCelebrity)
        .then((data) => {
            res.redirect("/celebrities")
        })
        .catch((err) => {
            console.log("error here", err)
            next(err)
        });
})

router.get("/celebrities", (req, res, next) => {
    
        Celebrity.find()
            .then((data) => {
                const newData = {
                    celebrities: data
                }
                res.render("celebrities/celebrities", newData)
            })
            .catch((err) => {
                console.log("error here at celebrities :)", err)
                next(err)
            });
})


module.exports = router;
