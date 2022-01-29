const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get('/', (req,res) =>{
    Celebrity.find()
    .then(allCelebritiesFromDB => {
        res.render('celebrities/celebrities.hbs', {celebrities: allCelebritiesFromDB});
    })
    .catch(error => {next(error)});
})

router.get('/create', (req,res) =>{
    res.render('celebrities/new-celebrity.hbs')
})

router.post('/create', (req,res,next) =>{
    const {name, occupation, catchPhrase} = req.body;

    Celebrity.create({name, occupation, catchPhrase})
    .then(() => {
        res.redirect('/');
    })
    .catch(error => {res.render('celebrities/new-celebrity.hbs'); next(error)});
});


module.exports = router;