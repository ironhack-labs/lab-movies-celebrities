// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("./../models/Celebrity.model")
const bcrypt = require("bcrypt");



router.get("/", (req, res, next) => {
    Celebrity.find()
    .then((celebrities) => {
        res.render('celebrities/celebrities', {celebrities} )
        console.log(celebrities)
    })
    .catch((err) => console.error(err))
  });

router.get("/create", (req, res, next) => {
    res.render("celebrities/new-celebrity"); 
});

router.post("/create", (req, res, next) => {
    const {username, occupation, catchPhrase} = req.body

    Celebrity.create({username, occupation, catchPhrase})
    .then(() => res.redirect('/celebrities'))
    .catch(() => res.render('/celebrities/new-celebrity', {
        errorMessage: 'Try signing up again'
    }))
})


  

// all your routes here

module.exports = router;
