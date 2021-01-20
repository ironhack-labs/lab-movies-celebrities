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

router.get(`/celebrities/:id`, (req,res,next) => {
    Celebrity.findById(req.params.id)
    .then(foundCeleb => {
        // console.log(foundMovie);
        res.render(`celebrities/celebrity-details`, { foundCeleb });
    })
    .catch(error => {
        console.log(`error showing movie details due to ${error}`);
    });
});

router.post(`/celebrities/:id/delete`, (req,res,next) => {
    Celebrity.findByIdAndDelete(req.params.id)
    .then(() => {
        res.redirect(`/celebrities`);
    })
    .catch(error => {
        console.log(`error deleting celebrities due to: ${error}`);
    });
});

router.get(`/celebrities/:id/edit`, (req,res,next) => {
    Celebrity.findById(req.params.id)
    .then(foundCeleb => {
        res.render(`celebrities/edit-celebrity`, { foundCeleb });
    })
    .catch(error => {
        console.log(`error editing celebs due to ${error}`);
    });

});

router.post(`/celebrities/:id/update`, (req,res,next) => {
    const { name, occupation, catchPhrase } = req.body;

    Celebrity.findByIdAndUpdate(req.params.id, { name, occupation, catchPhrase }, { new: true })
    .then((updatedCeleb) => {
        console.log(updatedCeleb)
        res.redirect(`/celebrities`);
    })
    .catch(error => {
        console.log(`error updating movies due to ${error}`);
    });


});


module.exports = router;
