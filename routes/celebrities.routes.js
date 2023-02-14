const router = require('express').Router();
const Celeb = require('../models/Celebrity.model')

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity');
})

router.post('/celebrities/create', async (req, res, next) => {

    try {
        const {name, occupation, catchPhrase} = req.body;
        await Celeb.create({name, occupation, catchPhrase});
        res.redirect('/celebrities')
    } catch (error) {
        console.log(error)
        next(error);
        res.render('celebrities/new-celebrity')
    } 
});

router.get('/celebrities', async (req, res, next) => {

    try {
        const celebsList = await Celeb.find();
        res.render('celebrities/celebrities', {celebsList});
    } catch (error) {
        console.log(error);
        next(error)
    }
    
})










module.exports = router;