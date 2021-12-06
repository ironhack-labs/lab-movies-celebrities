// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/celebrity.model");

// all your routes here

router.get("/create", (req, res, next) => {
    res.render("celebrities/new-celebrity.hbs");
});

// Create the /celebrities/create POST route
router.post("/create", (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.create({ name, occupation, catchPhrase })
        .then(celebrity => {
            res.redirect("celebrities");
        })
        .catch(err => {
            res.render("celebrities/new-celebrity", {
                celebrity: req.body,
                errorMessage: "Error creating celebrity"
            });
        });
});

router.get("/", (req, res, next) => {
    Celebrity.find()
        .then(celebrities => {
            res.render("celebrities/celebrities.hbs", { celebrities });
        })
        .catch(err => {
            console.log('Error',err);
            res.send("Error al listar", err);
        });
});


module.exports = router;
