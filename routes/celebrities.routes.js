// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model.js')

router.get('/celebrities/create', (req,res)=>{
    res.render('celebrities/new-celebrity.hbs');
});



module.exports = router;