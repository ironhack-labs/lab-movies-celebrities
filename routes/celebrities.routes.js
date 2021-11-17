const router    = require("express").Router();
const chalk     = require('chalk')
const Celebrity = require('../models/Celebrity.model')

router.get('/create', (req, res)=>{
    res.render('celebrities/new-celebrity')
})

router.post('/create', async (req, res)=>{
    console.log(req.body)
    const {name, occupation, catchPhrase} = req.body
    try{
        const createdCelebrity = await Celebrity.create({name, occupation, catchPhrase})
        console.log(createdCelebrity)
        res.redirect('/celebrities')
    } catch{
        console.log(chalk.bgRed(err))
        res.render('celebrities/new-celebrity')
    }
    
})
module.exports = router;