const router = require("express").Router();
// const {
//     route
// } = require("../app");
const Celebrity = require("../models/Celebrity.model")

router.get("/celebrities", (req, res) => {
    Celebrity.find()
        .then(CelebritiesFromDB => {

            res.render("celebrities/celebrities", {
                CelebritiesFromDB
            });
        })
        .catch(error => console.log("An error occurred while getting books from database: ", error)); // <--- .catch() - if some error happens handle it here
});






router.get("/celebrities/create", (req, res) => {
    Celebrity.find()
        .then(celebritiesFromDB => {
            res.render("celebrities/new-celebrity")
        })
        .catch(error => console.log("An error occurred while getting celebrities from database: ", error)); // <--- .catch() - if some error happens handle it here
});

// ****************************************************************************************
// POST route to create a new celebrities
// ****************************************************************************************

router.post("/celebrities/create", (req, res, next) => {
    const {
        name,
        occupation,
        catchPhrase
    } = req.body;
    Celebrity.create({

            name,
            occupation,
            catchPhrase

        })
        .then(newCelebrity => {
            // console.log("is this a new book: ", newSavedBook);
            res.redirect("/celebrities");
        })

        .catch(error => console.log('An error occured while creating celebrity'))

});




module.exports = router;