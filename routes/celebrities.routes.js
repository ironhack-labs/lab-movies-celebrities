const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

// all your routes here

// Create celeb
router.get('/celebrities/create', async (req, res, next) => res.render('celebrities/new-celebrity'));

router.post('/celebrities/create', async (req, res, next) => {
    
    const {name, occupation, catchPhrase} = req.body;
    
    try {
        const createdCeleb = await Celebrity.create({name, occupation, catchPhrase});
        res.redirect('/celebrities');
    } catch (error) {
        res.render('celebrities/new-celebrity');
        console.log(error); 
    }
});

// List all celebs
router.get('/celebrities', async (req, res, next) => {
 
    try {
        const celebrities = await Celebrity.find();
        res.render('celebrities/celebrities', { celebrities });
    } catch (error) {
        console.log(error);
        next(error);
    }
})




module.exports = router;