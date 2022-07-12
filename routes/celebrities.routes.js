const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")

// all your routes here
router.get("/celebrities/create", (req, res) => {
    res.render("celebrities/new-celebrity");
})

router.post("/celebrities/create", (req, res) => {
    const {name, occupation, catchPhrase} = req.body
    Celebrity.create({name, occupation, catchPhrase})
    .then((celebrity) => {
        console.log("A new celebrity has been added to the DB: " + celebrity)
        res.redirect("/celebrities")
    })
    .catch((error) => {
        console.log("An error occurred while creating a new celebrity: " + error);
        next(error);
    })
})

router.get("/celebrities", (req, res) => {
 Celebrity.find()
 .then( (dataFromDB) => {
    const data = {
        celebs: dataFromDB
    }
    res.render("celebrities/celebrities", data)
 })
 .then(() => {
    console.log("Displaying celebrities...")
 })
 .catch( (err) => {
    console.log("An error occured listing the Celebrities from DB" + err)
 })
})



module.exports = router;