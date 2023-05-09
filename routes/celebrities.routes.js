const Celebrity = require('../models/Celebrity.model');
const router = require('express').Router();

router.get('/create', (req, res, next) => {

        res.render("celebrities/new-celebrity");
});

router.post('/create', (req, res, next) => {

    // console.log(req.body);
    Celebrity.create(req.body)

    .then(() => {
        console.log("celebrity creada");
        res.redirect('/celebrities'); 
    })

    .catch((err) => {

        res.redirect('/celebrities/new-celebrity');
    })
    
});

router.get('/', (req, res, next) => {

    Celebrity.find()
    .then((allCelebs) => {
        res.render('celebrities/celebrities.hbs', {
            allCelebs: allCelebs
        })
    })

    .catch((err) => {
        next(err)
    })

})




module.exports = router;