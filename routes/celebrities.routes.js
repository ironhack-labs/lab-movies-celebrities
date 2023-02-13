// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
const Movie = require('../models/Movie.model')

const Celebrity = require('../models/Celebrity.model')

require('../db/index')



router.get('/celebrities/create', (req, res) => {
    res.render('./celebrities/new-celebrity')

})

router.post('/celebrities/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(celebrities => {
            console.log('This Celebrity', celebrities, 'has been added to the Data Base')
            res.redirect('./celebrities')
        })
        .catch(error => console.log(error))
        .finnaly(() => mongoose.connection.close())


})

router.get('/celebrities/celebrities', (req, res) => {
    // res.send('loquesea')

    Celebrity
        .find()
        .then(celebrities => {
            res.render('./celebrities/celebrities', { celebrities })
        })
        .catch(err => console.log(err))
})





module.exports = router;