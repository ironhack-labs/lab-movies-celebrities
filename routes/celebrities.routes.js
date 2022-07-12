const CelebrityModel = require("../models/Celebrity.model");

const router = require("express").Router();

// all your routes here

router.get("/celebrities", (req, res) => {
    CelebrityModel.find()
    .then((celebritiesDetails) => {
        const data = {celebritiesDetails}
        res.render('celebrities/celebrities',data)
    })
    .catch((error) => {
        console.log("Error retrieving celebrities from the database. ", error);
        next(error);
    });
})

router.get("/celebrities/create", (req, res) => {
    CelebrityModel.find()
    .then((celebritiesDetails) => {
        const data = {celebritiesDetails}
        res.render('celebrities/new-celebrity',data)
    })
    .catch((error) => {
        console.log("Error retrieving celebrities from DB, ", error)
        next(error);
    })

});

router.post("/celebrities/create",(req, res) => {
    const celebrityInfo = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase,
    }
    CelebrityModel.create(celebrityInfo)
    .then(() => {
        res.redirect("/celebrities")
    })
    .catch((error) => {
        console.log("Error creating new celebrity, ", error);
        next(error);
    })
})


module.exports = router;