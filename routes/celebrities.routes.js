const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model');

// adding new celebrities
router.get('/celebrities/create', (req, res, next) =>{
    res.render('celebrities/new-celebrity')
})

router.post("/celebrities/create",(req,res,next)=>{
    const{ name, occupation, catchPhrase} = req.body
    Celebrity.create({ name, occupation, catchPhrase})
        .then(() => {
            res.redirect("/celebrities")
        })
        .catch(error =>{
            console.log(`We have an error creating a celebrity`, error)
            res.redirect("/celebrities/create")
        })
})

// listing the celebrities
router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
    .then(celebritiesArr => {
        res.render('celebrities/celebrities', {celebritiesArr})
    })
    .catch(error => console.log(error))
})


module.exports = router;