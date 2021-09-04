const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")

router.get("/create", (req, res) => {
    res.render("./celebrities/new-celebrity")
})

router.post("/create", (req, res) => {

    const {name, occupation, catchPhrase} = req.body

    Celebrity
    .create({name, occupation, catchPhrase})
    .then(celebrity => {
        res.send(celebrity)
    })
    .catch(err => console.log(err))

    
})

module.exports = router;