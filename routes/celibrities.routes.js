const express = require("express");
const router = express.Router()
const celebritiesModel = require('../models/Celebrity.model')


router.get('/celebrities', (req,res,next) => {

    celebritiesModel.find()
        .then((celebrities) => {
            res.render("celebrities/celebrities", {celibritiesArr: celebrities}) 
        })
        .catch(e => {
            console.log('Error with list of celebrities', e);
            next(e)
        })

})


router.get('/celebrities/create', (req, res, next) => {
    res.render("celebrities/new-celebrity")
})

router.post('/celebrities/create', (req, res, next) => {
    const newCelebrities = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }
    celebritiesModel.create(newCelebrities)
        .then((newCelebrities) => {
            res.redirect('/celebrities')
        })
        .catch(e => {
        console.log("error with creation of celebrities", e)
        next(e)
});

})

module.exports = router;
