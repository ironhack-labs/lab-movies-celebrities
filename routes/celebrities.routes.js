const router = require('express').Router();
const Celebrity = require('../models/Celebrity.model.js');

router.get('/create', (req, res) => {
    // Assuming you want to fetch existing celebrities to populate in your form
    Celebrity.find()
        .then(celebrities => {
            res.render('celebrities/new-celebrity', { celebrities });
        })
        .catch(error => {
            console.error('Error fetching celebrities:', error);
            res.status(500).send('Internal Server Error');
        });
});

router.post('/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body;

    Celebrity.create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(() => res.redirect('/celebrities/new-celebrity'));
});

module.exports = router;
