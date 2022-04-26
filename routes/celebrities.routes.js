const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

const router = require("express").Router();


// Find all Celebrities 
router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
            .then( celebritiesArr => {
                res.render('celebrities/celebrities', { celebrities: celebritiesArr})
            })
            .catch(err => {
                console.log('error getting celebrities', err)
            })
})


// Celebrity Page
router.get('/celebrities/create', (req, res, next) => {
    Celebrity.create()
            .then ( () => {
                res.render('celebrities/new-celebrity')
            })
            .catch (err => {
                res.render("/celebrities/create")
                console.log("Error creating clebrities", err)
            })
})

// celebrity POST to DB
router.post('/celebrities/create', (req, res, next) => {

        const newCelebritiy = {
            name: req.body.name,
            occupation: req.body.occupation,
            catchPhrase: req.body.catchPhrase,
        }
        
        Celebrity.create(newCelebritiy)
                .then(celebrityFromDB => {
                    res.redirect('/celebrities')
                })
                .catch (err => {
                    res.render("/celebrities/new-celebrity")
                    console.log("Error creating new celebrity", err)
                })
})









module.exports = router;