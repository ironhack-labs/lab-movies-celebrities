const router = require('express').Router();
const Celebrity = require('/models/celebrity.model.js');

router.get('/create', (req, res) => {
    Celebrity.populate;
    res.render('celebrities/new-celebrity');
});

router.post('/create', (req, res) => {
    const {name, occupation, catchPhrase} = req.body;

    Celebrity
        .create({ name, occupation, catchPhrase})
        .then(() => res.redirect('./celebrities.routes.js'))
        .catch(() => res.redirect('./new-celebrity'))
})