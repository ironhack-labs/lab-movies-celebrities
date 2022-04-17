// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require(".././models/Celebrity.model")

router.get("/celebrities/create", (req, res, next) => {
    Celebrity
        .find()
        .then(celebrity => {
            res.render('celebrities/new-celebrities', celebrity);
        })
        .catch(err => console.log(err))

});

router.post("/celebrities/create", (req, res) => {
    const { name, occupation, catchPhrase } = req.body
    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => {
            res.redirect("/")
        })
        .catch(err => console.log(err))

})
router.get("/celebrities", (req, res) => {
    Celebrity
        .find()
        .then(celebrities => {
            res.render("celebrities/celebrities", { celebrities })

        })
        .catch(err => console.log(err))

})


router.get("/celebrities/:id", (req, res, next) => {
    const { id } = req.params
    Celebrity
        .findById(id)
        .then(celebrities => {
            res.render('celebrities/celebrities-details', celebrities)
        })
        .catch(err => console.log(err))

})

router.post("/celebrities/:id/delete", (req, res) => {
    const { id } = req.params
    Celebrity
        .findByIdAndRemove(id)
        .then(() => {
            res.redirect("/")
        })
        .catch(err => console.log(err))

})


// all your routes here

module.exports = router;