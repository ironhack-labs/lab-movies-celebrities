const router = require('express').Router();

const Celebrity = require('../models/Celebrity.model')

// Adding New Celebrities
router.get('/create', (req,res) => {
    res.render('../views/celebrities/new-celebrity')
})

router.post('/create', (req,res) => {

    const {name, occupation, catchPhrase} = req.body

    Celebrity
        .create({name, occupation, catchPhrase})
        .then(() => res.redirect('/celebrities'))            
        .catch(err => {
            res.render('../views/celebrities/new-celebrity')
            console.error(err)
        })
})

router.get('/', (req,res) => {
    
    Celebrity
        .find()
        .then(celebrityInfo => res.render('../views/celebrities/celebrities', {celebrityInfo}))
        .catch(err => console.log(err))
})


module.exports = router;