const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')

router.get('/celebrities/create', (req, res, next) => {
    res.render("celebrities/new-celebrity.hbs")
});

router.post('/celebrities/create', (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body
    Celebrity.create({ name, occupation, catchPhrase })
        .then( () => {
                res.redirect('/celebrities')
        })
        .catch( () => {
            res.redirect('celebrities/new-celebrity')
        })
})


module.exports = router;
