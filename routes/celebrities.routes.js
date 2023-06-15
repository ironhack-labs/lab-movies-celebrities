const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

// all your routes here

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
});

router.post('/celebrities/create', (req, res, next) => {

    const { name, occupation, catchPhrase } = req.body;  //defining what req.body contains

    const newCelebrity = new Celebrity({  //defining new instance of celebrity basing on its model
        name,
        occupation,
        catchPhrase
        })

      newCelebrity.save()
        .then(ifNewCelebrityIsSaved => {
        res.redirect('celebrities/celebrities');
        })

        .catch(ifThereIsAnError => {
        res.render('celebrities/new-celebrity', { error });
        })
});


    router.get('/celebrities', (req, res, next) => {

        Celebrity.find()
            .then(allCelebrities => {
                res.render('celebrities/celebrities', { allCelebrities });
            })

            .catch(error => {
                next(error);
            })
        
    });

module.exports = router;