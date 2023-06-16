//const app = require("../app");
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here
//IT3: GET & POST mthd, add new celebrities to the database:

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
});

router.post('/celebrities/create', (req, res, next) => {

    const { name, occupation, catchPhrase } = req.body;  //defining what req.body contains
    const newCelebrity = new Celebrity({  //defining new instance of celebrity basing on its model
        name: name,
        occupation: occupation,
        catchPhrase: catchPhrase
        })

      newCelebrity.save() // save or add celeb to DB
        .then(ifNewCelebrityIsSaved => {
        res.redirect('/celebrities');
        })

        .catch(ifThereIsAnError => {
        res.render('celebrities/new-celebrity', { error });
        })
});


//IT4: Listing Our Celebrities:

    router.get('/celebrities', (req, res, next) => {
        //Pass all the celebrities from database 
        Celebrity.find()
            .then(allCelebrities => {
                res.render('celebrities/celebrities', { allCelebrities }); // render the celebrities/celebrities.hbs view and pass the array of celebrities into the view as a variable
            })
            .catch(error => {
                next(error);
            })
    });


module.exports = router;