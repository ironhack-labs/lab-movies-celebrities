const router = require('express').Router();

const Celebrity = require('../models/Celebrity.model.js')
const Movie =require('../models/Movie.model.js');


router.get('/celebrities', async(req, res) =>{
    try {
        let allCelebritiesFromDB = await Celebrity.find();

        res.render('celebrities/celebrities.hbs', {celebrities: allCelebritiesFromDB})
    } catch (error) {
        console.log(error)
    }
})



router.get('/celebrities/create', async (req, res) =>{
    try {
      res.render('celebrities/new-celebrity.hbs')
    } catch (error) {
        console.log(error)
    }
})

router.post('/celebrities/create', async (req,res) =>{
    try {
        const {name, occupation, catchPhrase} = req.body
        await Celebrity.create( {name, occupation, catchPhrase})
        res.redirect('/celebrities');
    } catch (error) {
        console.log(error)
    }

})


module.exports = router