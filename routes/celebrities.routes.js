const Celebrity = require("../models/Celebrity.model");

const router = require('express').Router();

router.get ('/celebrities/create'), (req, res, next) => {
res.render('/celebrities/new-celebrity');
}

router.post('/celebrities/create', (req, res, next) =>

{
    const celebrityDetails = {

        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase,
    }

    Celebrity.create(celebrityDetails)
    .then(() => {   
        res.redirect("/celebrities")
    })
    .catch(err => {

        console.log("error creating new author in DB", err)
        next(err);
    })
})

module.exports = router;