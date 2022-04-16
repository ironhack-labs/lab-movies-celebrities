// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebritie = require("./../models/Celebrity.model")

// all your routes here

router.get('/', (req, res) => {
    
    Celebritie
        .find()
        .then(celebrities => {
            res.render('celebrities/celebrities.hbs', { celebrities })
        })
        .catch(err => console.log(err))
})

router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity.hbs')
})

router.post('/create', (req, res) => {

    const { name, occupation, catchPhrase} = req.body

    Celebritie
        .create({ name, occupation, catchPhrase })
        .then(() => {
            res.redirect(`/celebrities`)
        })
        .catch(() => {
            console.log(err)
            res.render('celebrities/new-celebrity.hbs')
        })
})



module.exports = router;