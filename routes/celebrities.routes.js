const router = require("express").Router();
const CelebrityModel = require("../models/Celebrity.model");

router.get("/celebrities/create", (req, res, next) => {

    console.log("entra en new celebrity get")
    res.render("../views/celebrities/new-celebrity");

})

router.post("/celebrities/create", (req, res, next) => {

    const { name, occupation, catchPhrase } = req.body;
    CelebrityModel.create({ name, occupation, catchPhrase })
        .then((newCelebrity) => {
            res.redirect("/celebrities")
        })
        .catch(() => {
            res.redirect("/celebrities/new-celebrity");
        })
});

router.get("/celebrities", (req, res, next) => {

    console.log("entra en get de celebrities");
    CelebrityModel.find()
        .then((celeb) => {
            res.render("../views/celebrities/celebrities", { celeb })
        })
        .catch((err) => next(err))
})


module.exports = router;