const Celebritie = require("../models/Celebrity.model")

const router = require("express").Router()



router.get('/create', (req, res) =>{
    
    res.render('celebrities/new-celebritie')
})

router.post('/create', (req, res)=>{
    //console.log('-------------->', req.body)
    const {name, occupation, catchPhrase} = req.body

    Celebritie
        .create({name, occupation, catchPhrase})
        .then(()=> res.redirect('/celebrities'))
        .catch(err => console.log(err))
    
})

router.get('/', (req, res) => {

    Celebritie
    .find()
    .then(celebritiesFromDB => 
        res.render('celebrities/celebrities-page', {celebritiesFromDB}))
    .catch(err => console.log(err))
})

module.exports = router