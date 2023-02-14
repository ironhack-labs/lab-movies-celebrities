// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model');

// Add new celebrity
router.get('/celebrities/new-celebrity', (req, res) => res.render('celebrities/new-celebrity'));

router.post('/celebrities/new-celebrity', async (req, res, next) => {
    try {
        const {name, occupation, catchPhrase} = req.body;

        await Celebrity.create({name, occupation, catchPhrase});

        res.redirect('/celebrities');

    } catch (error) {
        console.log(error);
        next(error);
        res.redirect('/celebrities/new-celebrity')
    }
})

// list of celebrities
router.get('/celebrities', async (req, res, next) => {
    try {
        let celebrities = await Celebrity.find();

        res.render('celebrities/celebrities', {celebrities});

    } catch (error) {
        console.log(error);
        next(error);
    }
})

module.exports = router;