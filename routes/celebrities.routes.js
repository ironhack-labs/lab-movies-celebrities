const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get('/celebrities/create', (req, res) => res.render('celebrities/new-celebrity'));

router.post('/celebrities/create', async (req, res, next) => {
    try {
        const {name, occupation, catchPhrase} = req.body;
        await Celebrity.create({name, occupation, catchPhrase});
        res.redirect('/celebrities')
    } catch (error) {
        console.log(error);
        res.render('celebrities/new-celebrity');
    }
})

router.get('/celebrities', async (req, res, next) => {
    try {
        const celebrities = await Celebrity.find();
        res.render('celebrities/celebrities.hbs', {celebrities})
    } catch (error) {
        console.log(error);
        next(error);
    }
})

module.exports = router;