
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// all your routes here
//IT3: GET & POST mthd, add new celebrities to the database:

router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity')
});

router.post('/celebrities/create', (req, res) => {

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

    router.get('/celebrities', (req, res) => {
        //Pass all the celebrities from database 
        
        Celebrity.find()
            .then((celebrities) => {
                res.render('celebrities/celebrities', { celebrities }); // render the celebrities/celebrities.hbs view and pass the array of celebrities into the view as a variable
            })
            .catch(() => console.log("error"))

    });


module.exports = router;