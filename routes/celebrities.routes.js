// starter code in routes/celebrities.routes.js 
const router = require("express").Router();

// all your routes here

const Celebrity = require('../models/Celebrity.model.js');


// Get routes to display all the celebrities in the db:

router.get('/celebrities/create', async (req,res) => {
    res.render('celebrities/new-celebrity.hbs');
});

// Post rout to submit info about the created celebrity
router.post('/celebrities/create', async (req,res) => {
    try {
        // Object destructuring with req.body
        // There's always a match between an input's name and a req.body property's name
        const {name, occupation, catchPhrase} = req.body;

        await Celebrity.create({name, occupation, catchPhrase});
        res.redirect('/celebrities');
    }
    catch (error) {
        console.log(error);
        res.render('celebrities/new-celebrity.hbs')
    }
});

//GET route to display all the celebrities in the Db
router.get('/celebrities', async (req,res) => {
    try{
        let allCelebritiesFromDb = await Celebrity.find();

        res.render('celebrities/celebrities.hbs', {celebrities: allCelebritiesFromDb})
    }
    catch(error){
        console.log(error)
    }
})

module.exports = router;