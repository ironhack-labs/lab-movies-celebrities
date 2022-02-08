
const router = require("express").Router();
const Celebrities = require("../models/Celebrity.model")


router.get("/new-celebrity", (req, res, next) => {
    Celebrities.find()
        .then(celebFromDB => {
            res.render("celebrities/new-celebrity", { celebrity: celebFromDB });
        })
        .catch()
});

router.post('/new-celebrity', (req, res, next) => {
    const newCelebrity = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase,
    };
    Celebrities.create(newCelebrity)
        .then(celeb => {
            res.redirect("/celebrities");
        })
        .catch(() => {
            res.render("celebrities/new-celebrity")
        })
})

router.get("/", (req, res, next) => {
    Celebrities.find()
        .then(celebrities => {
            res.render("celebrities/celebrities-list", {celebrity: celebrities});
        })
        .catch();
});


module.exports = router;