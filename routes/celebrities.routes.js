const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get('/celebrities/create', (req, res, next) => res.render("celebrities/new-celebrity"));


router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;

    Celebrity.create({ name, occupation, catchPhrase})
    .then(() => res.redirect('/celebrities'))
    .catch(err => {
        res.render("celebrities/new-celebrity");
        console.log(`Error while creating new celebrity: ${err}`);
        next(err);
    })
});

router.get('/celebrities', (req, res, next) => {
    
    Celebrity.find()
        .then((dbCelebrities) => {
            res.render("celebrities/celebrities", { dbCelebrities });
        })
        .catch((err) => console.log(`Err while displaying celebrities input page: ${err}`));
});

module.exports = router;