// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")

// 
// GET route to display the form for new celebrity => Show a form to create a celebrity
router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity')
});

//POST route to save a new celebrity to the database in the celebrities collection
router.post('/celebrities/create', (req, res, next) => {

    const newCelebrity = {
        name :req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase,
    }

    Celebrity.create(newCelebrity)
        .then(newCelebrity=>{
            console.log("new celebrity created into the DB as:", newCelebrity.name)
            res.redirect("/celebrities")
        })
        .catch(err=>{
            ("Something went wrong creating the newCelebrity into the DB",err)
            res.render("celebrities/new-celebrity")
            next(err);
        })
  });

// GET route to retrieve and display all the celebrities
router.get("/celebrities", (req, res, next)=>{
    Celebrity.find()
    .then((celebritiesList)=>{
        console.log(celebritiesList);
        res.render("celebrities/celebrities-list", {celebrities: celebritiesList})
    })
    .catch(err=>{
        ("Something went wrong query celebritiesList from the DB",err)
        next(err);
    })
})




module.exports = router;