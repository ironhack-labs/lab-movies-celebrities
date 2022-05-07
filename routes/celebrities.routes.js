const router = require('express').Router();

const Celebrity = require ('../models/Celebrity.model')
router.get('/create', async (req, res, next) => {
    try {
        const celebrities = await Celebrity.find();
        res.render('celebrities/new-celebrity',{celebrities})

    } catch (error) {
        next(error)
    }
});

router.post()


module.exports = router;