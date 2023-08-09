// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model.js')
// all your routes here

router.get('/celebrities/create', (req,res) =>{
    res.render('celebrities/new-celebrity.hbs')
})

router.post('/celebrities/create', async(req, res) => {
    try {
        const {name, occupation, catchphrase} = req.body;
        await Celebrity.create({name, occupation, catchphrase})
        res.redirect('/celebrities')
    }
    catch(error){
        console.log(error)
        res.redirect('/new-celebrities')
    }
} )

router.get('/celebrities', async (req, res) => {
    try{
        let allCelebritiesFromDB = await Celebrity.find()
        res.render('celebrities/celebrities.hbs', {celebrities: allCelebritiesFromDB})
    }
    catch(error){
        console.log(error)
    }
})

module.exports = router;