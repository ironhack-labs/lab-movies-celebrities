const router = require('express').Router();
const Celebrity = require('../models/Celebrity.model')

router.get('/', async (req, res) => {
    try {
        const allCelebs = await Celebrity.find()
        res.render('celebrities/celebrities', {celebrity: allCelebs})
    } catch (err) {
        console.log(err);
    }
});

router.get('/create', async (req, res) => {
    res.render('celebrities/new-celebrity');
});

router.post('/create', async (req, res) => {
    try {
        const { name, occupation, catchPhrase } = req.body;
        const newCelebrity = await Celebrity.create({ name, occupation, catchPhrase });
        res.redirect('/celebrities')
    } catch (err) {
        console.error(err);
    }
});






module.exports = router;