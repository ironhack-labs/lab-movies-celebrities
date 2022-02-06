const router = require("express").Router();

const Celebrity = require('../models/celebrity.model')

//Adding New Celebrities

router.get("/celebrities/create", (req, res, next) => { 
    res.render("celebrities/new-celebrity");
  });


router.post('/celebrities/create', (req, res, next) =>{
    const {name, occupation, catchPhrase} = req.body

    Celebrity
        .create ({name, occupation, catchPhrase})
        .then(()=> res.redirect('/celebrities'))
        .catch(err=> console.log (err))
});

// list of all the celebrities.

router.get ('/celebrities', (req, res, next)=> {
    Celebrity
        .find()
        .then (celebrities => res.render('celebrities/celebrities',{ celebrities}))
        .catch (err=> console.log (err))
});

module.exports = router;