const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")

router.get("/celebrities", (req, res) => {

    Celebrity
    .find()
    .then((celebrities) => {
        res.render("./celebrities/celebrities", {celebrities})
    })
    .catch(err => console.log(err))

})

router.get("/celebrities/details/:id", (req, res) => {
    const { id } = req.params;

    Celebrity
        .findById(id)
        .then((celebrity) => {
            res.render("./celebrities/celebrity-details", celebrity);
        })
        .catch((err) => console.log(err));
})

router.get("/celebrities/create", (req, res) => {
    res.render("./celebrities/new-celebrity")
})

router.post("/celebrities/create", (req, res) => {

    const {name, occupation, catchPhrase} = req.body

    Celebrity
    .create({name, occupation, catchPhrase})
    .then(celebrity => {
        res.redirect("/celebrities")
    })
    .catch(err => console.log(err))

    
})

router.get("/celebrities/:id/edit", (req, res) => {

    const { id } = req.params;

    Celebrity
        .findById(id)
        .then((celebrity) => {
            res.render("./celebrities/edit-celebrity", celebrity)
        })
        .catch((err) => console.log(err))

    const celebrityDetails = {};

});

router.post("/celebrities/:id/edit", (req, res) => {
    const { id } = req.params;
    const { name, occupation, catchPhrase } = req.body

    Celebrity
    .findByIdAndUpdate(id, {name, occupation, catchPhrase}, {new: true})
    .then((celebrity) => {
        res.redirect(`/celebrities/details/${celebrity._id}`)
    });
});

router.post("/celebrities/:id/delete", (req, res) => {
    const { id } = req.params;

    Celebrity
    .deleteOne({_id: id})
    .then( () => {
        res.redirect("/celebrities")
    })
})

module.exports = router;