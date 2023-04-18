const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")

router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
    .then(celebritiesFromDb => {
        console.log(celebritiesFromDb)
    res.render("celebrities/celebrities", { celebrities: celebritiesFromDb})
    })
    .catch(err => next(err))
})

// Iteration 2:

router.get("/celebrities/create", (req, res, next) => { 
    res.render("celebrities/new-celebrity")
    })

router.get("/celebrities/new-celebrity", (req, res, next) => {
    Celebrity.create()  
    .then(celebritiesFromDb => {
        console.log(celebritiesFromDb)
    res.render("celebrities/new-celebrity", { celebrities: celebritiesFromDb})
    })
})

router.post("/celebrities/new-celebrity", (req, res, next) => { 
        console.log(req.body)
    const { name, occupation, catchPhrase } = req.body
   
    Celebrity.create({ name, occupation, catchPhrase })
            .then(() => {
                console.log("createdCelebrity")
                res.redirect("/celebrities") 
            })
            .catch((err) => {
                res.render("celebrities/new-celebrity", {
                    errorMessage: "Error",
                });
            });
    });

router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
    .then(celebrities => {
        res.render("celebrities/celebrities", { celebrities: celebrities }) 
    })
})



module.exports = router