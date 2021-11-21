// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movies.model");

/* GET celebrities page */
router.get("/celebrities", (req, res, next) => {
    //route ---- this is the url
    Celebrity.find()
    .then((celebritiesList) => {
        res.render("celebrities/celebrities", {celebritiesList});
    })
    .catch((err) => {
        console.log(err)
    });
    //view ----- an hbs file
});

router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    //console.log("celebrityId", celebrityId);
    Celebrity.create({ name, occupation, catchPhrase })
        .then((createdCelebrity) => {
            console.log("Celeb", createdCelebrity);
            res.redirect("/celebrities"); //URL
        })
        .catch((err) => {
            console.log(err)
            res.redirect("/celebrities/create") // without / view...render-> view, redirect->url
        });
})

router.get("/celebrities", (req, res) => {
    const getThemAll = req.query.getThemAll;
    Celebrity.find({ name: { $regex: getThemAll, $options: "i" } })
        .then((celebritiesList) => {
            //console.log("celebritiesList", celebritiesList);
            res.render("celebrities/new-celebrity.hbs", { celebritiesList: celebritiesList })
        })
        .catch((err) => { console.log(err); })
})


module.exports = router;
