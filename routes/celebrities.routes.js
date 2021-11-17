//Require the router
const router = require('express').Router()


//MODELS
const Celebrity = require('../models/Celebrity.model')


//ROUTES
router.get('/', async (req, res) => {
    try {
        const celebrities = await Celebrity.find({})
        res.render('./celebrities/celebrities.hbs', { celebrities })
    }
    catch (err) {
        console.log('Error retrieving all celebrities:', err)
    }
})

router.get('/create', (req, res) => {
    res.render('./celebrities/newCelebrity.hbs')
})

router.post('/create', async (req, res) => {
    const { name, occupation, catchPhrase } = req.body //Destructure the data passed through the body
    try {
        const newCelebrity = await Celebrity.create({ name, occupation, catchPhrase })
        res.render('./celebrities/celebrities.hbs')
    }
    catch (err) {
        console.log('Error creating new celebrity:', err)
        res.render('./celebrities/newCelebrity.hbs')
    }
})

module.exports = router