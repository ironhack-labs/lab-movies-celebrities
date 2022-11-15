// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model.js');
// all your routes here
router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity');
});

router.post('/celebrities', (req, res) => {
    const { name, occupation, catchPhrase } = req.body;

    res.send(`Name: ${name}, Occupation: ${occupation}, Phrase: ${catchPhrase}`)
});

// router.post('/celebrities/create', (req, res) => {
//     const { name, occupation, catchPhrase } = req.body;
//     res.send(`Name: ${name}, Occupation: ${occupation}, Phrase: ${catchPhrase}`)
// })


module.exports = router;