const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model.js")

router.get("/create", (req, res, next) => {
    res.render("celebrities/new-celebrity");
});
router.post('/create', (req, res, next) => {
    const { name, occupation, catchphrase } = req.body;
    console.log(name, occupation, catchphrase);
    Celebrity.create({ name, occupation, catchphrase })
        .then(celebrityFromDB => res.render('celebrities/celebrities'))
        .catch(error => res.render('celebrities/new-celebrity'));
})



module.exports = router;
