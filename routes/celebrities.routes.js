// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const express = require('express');
const router = express.Router();

const Celebrity = require('./../models/Celebrity.model')
// no olvides

// /celebrities list
// quitamos celebrities
router.get('/', (req, res) => {

    Celebrity
        .find()
        .then(celebritiesFromDB => {
            res.render('celebrities/celebrities', { celebrities: celebritiesFromDB })
        })
        .catch(err => console.log(err))
});

// *******************
// quitamos /celebrities

router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

// /celebrities/create POST 

router.post('/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch(err => console.log(err))
});

// /celebrities list
// quitamos celebrities
// router.get('/', (req, res) => {
//     Celebrity
//         .find()
//         .then(celebritiesFromDB => {
//             res.render('celebrities/celebrities', { celebrities: celebritiesFromDB })
//         })
//         .catch(err => console.log(err))

// });

// all your routes here
module.exports = router;