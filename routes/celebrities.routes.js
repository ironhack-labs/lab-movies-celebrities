const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity.model');


router.get(
    "/create",
    (req, res) => {
        res.render("celebrities/new-celebrity")
    })

router.get(
    '/',
    (req, res) => {
        Celebrity.find()
            .then(allCelebs => {
                res.render('celebrities/celebrities', {
                    allCelebs
                })
            })
    });

router.post(
    "/create",
    (req, res) => {
        const {name, occupation, catchPhrase} = req.body
        Celebrity.create({name, occupation, catchPhrase})
            .then(newCelebrity => res.redirect("/celebrities"))
            .catch(err => res.render("/celebrities/new-celebrity"))
    })


module.exports = router;