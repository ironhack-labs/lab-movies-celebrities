const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity.model');


function isLoggedIn(req, res, next) {
    if (req.session.currentUser) next() // next invocation tells Express that the middleware has done all it work
    else res.redirect("/auth/login")
}


router.get(
    "/create", isLoggedIn,
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
        const {
            name,
            occupation,
            catchPhrase
        } = req.body
        Celebrity.create({
                name,
                occupation,
                catchPhrase
            })
            .then(newCelebrity => res.redirect("/celebrities"))
            .catch(err => res.render("/celebrities/new-celebrity"))
    })





module.exports = router;