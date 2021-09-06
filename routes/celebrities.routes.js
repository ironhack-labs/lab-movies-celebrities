
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model')

/* GET home page */
router.get("/", (req, res, next) => {

    Celebrity
        .find()
        .then((celebrities) => {
            console.log(celebrities)
            res.render("celebrities/celebrities", { celebrities });
        })
        .catch(err => console.error(err))

});

router.get("/create", (req, res, next) => {
    res.render('celebrities/new-celebrity');
});


router.post('/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body
    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch(err => console.error(err))

});

module.exports = router;
