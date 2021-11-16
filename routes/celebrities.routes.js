const router = require("express").Router();
const Celebrity = require("../models/celebrity.model")

// all your routes here

// GET - Show form to create a celebrity
router.get("/celebrities/create", (req,res) => {
    res.render("celebrities/new-celebrity");
});

//POST - Send and save data from form to database
router.post("/celebrities/create", (req,res) => {
    const { name, occupation, catchPhrase } = req.body;
    console.log(req.body)

    Celebrity.create({ name, occupation, catchPhrase })
        .then((createdCelebrity) => {
            res.redirect("/");
        })
        .catch( (err) => console.log(err));
});

// Show all celebrities
router.get("/celebrities", (req, res) => {

    Celebrity.find()
        .then((celebritiesList)=> {
            res.render("celebrities/all-celebrities", {celebritiesList});
        })
        .catch( (err) => console.log(err));
  });

  
module.exports = router;
