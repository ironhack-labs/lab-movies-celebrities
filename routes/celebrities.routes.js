const router = require("express").Router()
const { findByIdAndDelete, findByIdAndRemove } = require("../models/Celebrity.model")
const Celebrity = require("../models/Celebrity.model")


// CREATE CELEBRITIES
router.get("/create", (req, res) => {
    res.render("celebrities/new-celebrity")
})

router.post("/create", (req, res) => {
    const {name, occupation, catchPhrase} = req.body

    Celebrity  
        .create({ name, occupation, catchPhrase })
        .then(() => {
            res.redirect("/celebrities")
        })
        .catch(() => res.render("/create"))
})



// LIST OF CELEBRITIES

router.get("/", (req, res) => {
    Celebrity
            .find()
            .then(celebs => {
                res.render("celebrities/celebrities", {celebs})
            })
            .catch(err => console.log(err))
})




// DELETING CELEBRITIES

router.post("/:id/delete", (req, res) => {
    const { id } = req.params

    Celebrity
        .findByIdAndRemove(id)
        .then(() => {
            res.redirect("/celebrities")
        })
        .catch(err => console.log(err))

})







module.exports = router