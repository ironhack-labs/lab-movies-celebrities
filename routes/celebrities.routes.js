const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');

// all your routes here

router.get('/celebrities/create', (req, res, next) =>
res.render('celebrities/new-celebrity'));

router.post('/celebrities/create', async(req, res, next) =>{
    try {
        const {name, occupation, catchPhrase} = req.body;
        const createCelebrity = await Celebrity.create({name, occupation, catchPhrase});

        console.log(createCelebrity)
        res.redirect('/celebrities');
    } catch (error) {
/*         res.redirect('/celebrities/new-celebrity');
 */        console.log(error);
        next(error);
    }
});


router.get('/celebrities', async (req, res, next) =>{
    try {
        const celebrities = await Celebrity.find()
        res.render('celebrities/celebrities', {celebrities})
    } catch (error) {
        console.log(error);
        next(error);
    }
})




module.exports = router;