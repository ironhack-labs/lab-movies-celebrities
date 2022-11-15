// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model.js");

// all your routes here
// create a new celebrity - load the form
router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity.hbs");
});

// create a new celebrity - post it to the server
router.post("/celebrities/create", (req, res, next) => {    
    const { name, occupation, catchPhrase } = req.body;

    Celebrity.create({name, occupation, catchPhrase})
    .then((newCelebrity) => {
        console.log(`A new celebrity is created: ${newCelebrity.name}.`);
        res.redirect("/celebrities");
    })
    .catch(error => {
        res.render("celebrities/new-celebrity.hbs");
        next(error);
    });
});

// delete a celebrity
router.post("/celebrities/:celebrityId/delete", (req, res, next)=>{
    const { celebrityId } = req.params;

    Celebrity.findByIdAndDelete( celebrityId )
    .then(() => res.redirect("/celebrities"))
    .catch(error => next(error));
});

// edit a celebrity - get the form
router.get("/celebrities/:celebrityId/edit", (req, res, next)=>{
    const { celebrityId } = req.params;

    Celebrity.findById(celebrityId)
    .then((celebrityToEdit) => {
        res.render("celebrities/edit-celebrity.hbs", {celebrity: celebrityToEdit})
    })
    .catch(error => next(error));
});

// edit a movie - update the document
router.post("/celebrities/:celebrityId/edit", (req, res, next)=>{
    const { name, occupation, catchPhrase } = req.body;
    const { celebrityId } = req.params;

    Celebrity.findByIdAndUpdate(celebrityId, { name, occupation, catchPhrase })
    .then((updatedCelebrity)=>{
        res.redirect(`/celebrities/${updatedCelebrity._id}`)
    })
    .catch(error => next(error));

});

// see details of a celebrity
router.get("/celebrities/:celebrityId", (req, res, next)=>{
    const { celebrityId } = req.params;

    Celebrity.findById(celebrityId)
    .then((thisCelebrity) => {
        res.render("celebrities/celebrity-details.hbs", {celebrity: thisCelebrity})
    })
    .catch(error => next(error));
});

// view all celebrities
router.get("/celebrities", (req, res, next)=>{

    Celebrity.find()
    .then((allCelebrities) => {
        console.log('Retrieved celebrities from DB:', allCelebrities);
        res.render("celebrities/celebrities.hbs", {celebrities: allCelebrities});
    })
    .catch((error) => {
        console.log("Error while getting the celebrities from the DB: ", error);
        next(error);
    });
})

module.exports = router;