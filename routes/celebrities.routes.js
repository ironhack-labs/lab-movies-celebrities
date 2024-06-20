const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model')


router.get('/create', (req, res, next) => {
    res.render('celebrities/new-celebrity', { title: 'Create Celebrity' })
});

router.post('/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body; 
    Celebrity.create({ name, occupation, catchPhrase })
        .then((newCelebrity) => {
            res.redirect('/celebrities',);
        })
        .catch((err) => {
            res.render('celebrities/new-celebrity', { title: 'Create Celebrity', err: 'Error creating celebrity' });
        });
});

router.get('/', (req, res, next) => {
    Celebrity.find()
        .then((celebrities) => {
            res.render('celebrities/celebrities', { title: 'All Celebrities', celebrities});
        })
        .catch((err) => {
            res.send('err')
        });
});

module.exports = router;