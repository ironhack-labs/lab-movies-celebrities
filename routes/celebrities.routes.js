const Celebrity = require('../models/Celebrity.model');

const router = require('express').Router();

// all your routes
router.get('/', async(req,res,next) => {
    try {
        const celebrities = await Celebrity.find();
        console.log(celebrities);
        res.render('celebrities/celebrities',{celebrities});


    } catch (error) {
        next(error);
    }

})

router.get('/create', (req,res,next) => {
    res.render('celebrities/new-celebrity');
});

router.post('/create', async(req,res,next) => {
    try {
        const {name,occupation,catchPhrase} = req.body;

        await Celebrity.create({
            name,
            occupation,
            catchPhrase
        })
        res.redirect('/');
    } catch(error) {
        next(error);
    }
});



module.exports = router;
