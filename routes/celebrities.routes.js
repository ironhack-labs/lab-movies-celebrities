const router = require('express').Router();
const CelebrityModel = require ('../models/Celebrity.model');

//Create the GET
router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity');
})


//Create the POST 
router.post('/celebrities/create', (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body;
    CelebrityModel.create({name, occupation, catchPhrase})
    .then(() => {
        res.redirect('/celebrities')                
    })
    .catch((err) => {
        next(err);
        // Might be bad practice because of possibiltity to create data multiple times
        res.render('celebrities/new-celebrity.hbs', {name, occupation, catchPhrase});
    })
})

router.get('/celebrities', (req, res, next) => {
    CelebrityModel.find()
    .then((celebrityData) => {
            console.log("I run 2")
            res.render('celebrities/celebrities.hbs', {celebrityData})
        })
        .catch(err => {
            next(err)
        })
})




module.exports = router;