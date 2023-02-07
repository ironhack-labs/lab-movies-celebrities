// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity')
});

module.exports = router;