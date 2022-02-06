const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")
const Movie = require("../models/Movie.model")

router.get("/celebrities", (req, res) => {
    Celebrity
        .find()
        .then(list => res.render("./celebrities/celebs-list", { list }))
        .catch(err => {

            console.log(err)

        })
})
//CELEBRITY CREATE
router.get("/celebrities/create", (req, res) => {
    res.render("./celebrities/celebs-new")
})

router.post("/celebrities/create", (req, res) => {
    const { name, ocupation, catchPhrase } = req.body

    Celebrity
        .create({ name, ocupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => {
            res.render("./celebrities/celebs-new")
            console.log(err)
        })
})

//CELEBRITY DETAILS



router.get("/celebrities/:id/details", (req, res) => {

    const { id } = req.params

    Celebrity
        .findById(id)
        .then(celeb => res.render("./celebrities/celebs-details", celeb))
        .catch(err => {
            console.log(err)
        })
})

//CELEBRITY DELETE

router.post("/celebrities/:id/details", (req, res) => {

    const { id } = req.params

    Celebrity
        .findByIdAndDelete(id)
        .then(() => res.redirect("/celebrities"))
        .catch(err => {
            console.log(err)
        })
})

//CELEBRITY EDIT

router.get("/celebrities/:id/edit", (req, res) => {

    const { id } = req.params

    Celebrity
        .findById(id)

        .then(celeb => res.render("./celebrities/celebs-edit", celeb))

        .catch(err => {
            console.log(err)
        })
})

router.post("/celebrities/:id/edit", (req, res) => {

    const { id } = req.params
    let { name, ocupation, catchPhrase } = req.body

    Celebrity
        .findByIdAndUpdate(id, { name, ocupation, catchPhrase })

        .then(() => res.redirect("/celebrities"))

        .catch(err => {
            console.log(err)
        })
})



module.exports = router