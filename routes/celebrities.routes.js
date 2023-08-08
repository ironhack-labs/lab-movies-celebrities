// starter code in both routes/celebrities.routes.js and routes/movies.routes.js

const router = require("express").Router();

//Require Celebrity model
const Celebrity = require('../models/Celebrity.model.js')

// all your routes here

//Get route to display create form
router.get('/celebrities/create', (req,res) => {
    res.render('celebrities/new-celebrity.hbs')
})

router.post('/celebrities/create', async (req,res)=>{
    try{
        const {name, occupation, catchPhrase} = req.body;
        await Celebrity.create({name, occupation, catchPhrase})
        res.redirect('/celebrities');
    }
    catch(error){
        console.log(error)
        res.render('celebrities/new-celebrity.hbs')
    }
})

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