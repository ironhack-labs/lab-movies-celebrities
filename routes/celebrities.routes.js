// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');

router.get('/celebrities/create', (req,res)=>{
    res.render('celebrities/new-celebrity');
    });

    router.post('/celebrities/create', async(req,res)=>{
        //object distructuring
        try{
        const {name, occupation, catchPhrase} = req.body;
    
        await Celebrity.create({name, occupation, catchPhrase});
        res.redirect('/celebrities');
        }
        catch(error){
            console.log(error);
        }
     });

     router.get('/celebrities', async(req,res)=>{
        try{
            // get all celebrities from database via .find() method
            let allcelebritiesFromDb = await Celebrity.find();
        
        res.render('celebrities/celebrities.hbs', {celebrities: allcelebritiesFromDb});
    
        }
        catch(error){
            console.log('Error while getting celebrities', error);
        }
        });

module.exports = router;