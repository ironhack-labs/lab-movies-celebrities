const router = require('express').Router();
const CelebrityModel = require('../models/Celebrity.model');

router.get('/celebrities', (req, res, next) => {
    CelebrityModel.find({}, 'name occupation catchPhrase')
        .then((celebs) => {
            res.render('celebrities/celebrities', { celebs })
        })
        .catch((error) => {
            console.log(error)
        })
});


router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity');
})

router.post('/celebrities/create', (req,res,next) => {
    const {name, occupation, catchPhrase} = req.body;

    CelebrityModel.create({ name, occupation, catchPhrase })
        .then(() => {
            res.redirect('/celebrities')
        }).catch(() => {
            res.render('celebrities/new-celebrity');
        })
});

module.exports = router;

