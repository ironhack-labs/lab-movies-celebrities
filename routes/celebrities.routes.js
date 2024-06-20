// Iteration 1
const router = require("express").Router();

// Requiring models
const Celebrity = require('../models/Celebrity.model.js');

// Iteration 3 - Adding New Celebrities
router.get('/celebrities/create', async (req,res) => {
    res.render('celebrities/new-celebrity')
});

router.post('/celebrities/create', async (req,res) => {
    try{
        const {name, occupation, catchPhrase} = req.body;
    
        await Celebrity.create({name, occupation, catchPhrase});
        res.redirect('/celebrities');
    }
    catch (error){
        cosole.log(error);
    }
});

// Iteration 4 - GET route to display all the celebrities in the Db
router.get('/celebrities', async(req,res) => {
    try{
        // get all celebrities from Database via .find() method
        let celebrities = await Celebrity.find();

        res.render('celebrities/celebrities.hbs', {celebrities});
    }
    catch(error) {
        console.log(error);
    }
});

module.exports = router;