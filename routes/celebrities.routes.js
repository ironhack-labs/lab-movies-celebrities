// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model")

router.get("/", (req, res) => {

    Celebrity
        .find()
        .then(celebrity => res.render("celebrities/celebrities", { celebrity }))
        .catch(err => console.log(err))
})

router.get("/create", (req, res) => {

    res.render("celebrities/new-celebrity")

})

router.post('/create', (req, res, next) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect("/celebrities"))
        .catch(err => {
            console.log(err)
            res.redirect("/celebrities/create")
        })

});

router.get("/:celebrityID", (req, res) => {

    const { celebrityID } = req.params

    Celebrity
        .findById(celebrityID)
        .then(celebrity => res.render("celebrities/celebrity-detail", celebrity))
        .catch(err => console.log(err))
})

router.post("/:celebrityID/delete", (req, res) => {

    const { celebrityID } = req.params

    Celebrity
        .findByIdAndDelete(celebrityID)
        .then(() => res.redirect("/celebrities"))
        .catch(err => console.log(err))
})

router.get("/:celebrityID/edit", (req, res) => {

    const { celebrityID } = req.params

    Celebrity
        .findById(celebrityID)
        .then((celebrity => res.render("celebrities/edit-celebrity", celebrity)))
        .catch(err => console.log(err))
})
router.post("/:celebrityID/edit", (req, res) => {

    const { celebrityID } = req.params

    Celebrity
        .findByIdAndUpdate(celebrityID, req.body, { new: true })
        .then((celebrity => res.render("celebrities/celebrity-detail", celebrity)))
        .catch(err => console.log(err))
})


module.exports = router;