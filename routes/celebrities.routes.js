// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
const Celebrity = require('../models/Celebrity.model.js');

router.get('/create', (req, res, next) => {
    res.render('celebrities/new-celebrity.hbs')
} )

router.post('/create', async (req, res, snext) => {
    try {
        const {name, occupation, catchPhrase} = req.body
 await Celebrity.create({
 name, occupation, catchPhrase
})
res.redirect("/celebrities");
    }
catch(err){
    console.log(error);
    res.render("celebrities/new-celebrity");
}

})

module.exports = router;