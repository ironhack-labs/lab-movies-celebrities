const express = require("express");
const router = express.Router();
const Celebrity = require(`../models/Celebrity.model`);

/* GET home page */
router.get("/celebrities/new", (req, res, next) => res.render(`celebrities/new-celebrity`));

router.post(`/celebrities/create`, (req,res,next) => {
    const {name, occupation, catchPhrase} = req.body;

    Celebrity.create({name, occupation, catchPhrase})
    .then(createdCelebs => {
        res.redirect(`/celebrities`);
    })
    .catch(err => {
        console.log(`Try again ,error getting celebrities due to ${err}`);
        res.render(`celebrities/new-celebrity`)
    });
});

router.get(`/celebrities`, (req,res,next) => {
    Celebrity.find()
    .then(celebsFromDB => {
        res.render(`celebrities/celebrities`, { celebsFromDB });
    })
    .catch(err => {
        console.log(`error getting celebs from database due to ${err}`);
    });
});



module.exports = router;
