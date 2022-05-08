const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');
const Movie = require("../models/Movie.model");

// all your routes here

router.get('/create', (req, res, next) => {
    res.render('celebrities/new-celebrity');
})

router.post('/create', async (req, res, next) => {
    try {
        const { name, occupation, catchPhrase} = req.body;
        await Celebrity.create({
            name,
            occupation,
            catchPhrase
        });
        res.redirect('/celebrities');
    } catch (error) {
		next(error);
        res.render('celebrities/new-celebrity');
	}
})


router.get('/', async (req, res, next) => {
    try {
        const celebrities = await Celebrity.find();
        res.render('celebrities/celebrities', { celebrities });
    } catch(error) {
		next(error);
	}
})

module.exports = router;