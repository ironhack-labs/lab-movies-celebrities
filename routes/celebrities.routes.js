const Celebrity = require('../models/Celebrity.model');

const router = require('express').Router();

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity');
});

router.post('/celebrities/create', async (req, res, next) => {
    try {
        const { name, occupation, catchPhrase } = req.body;

        const newCelebrity = await Celebrity.create({ name, occupation, catchPhrase});

        res.redirect('celebrities');

    } catch(err) {
        res.render('celebrities/new-celebrity');
        console.log(err);
    }
});

router.get('/celebrities/celebrities', async (req, res, next) => {
    try {
        const celebrities = await Celebrity.find();
        res.render('celebrities/celebrities', { celebrities });
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;