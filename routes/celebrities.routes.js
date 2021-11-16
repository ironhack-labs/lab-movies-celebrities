const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

/* GET home page */
router.get("/celebrities", (req, res, next) => {
  res.render("celebrities/celebrities");
});

module.exports = router;


// GET CREATE  - Add/Create a new celeb from the form

router.get("/celebrities/create", (req, res) =>  {
    res.render('celebrities/new-celebrity');
})


// POST CREATE 

router.post("/celebrities/create", (req, res) => {
    const { celebrityName , occupation, catchPhrase} = req.body;


    Celebrity.create({celebrityName , occupation, catchPhrase})
        .then((createdCelebrity) => {
         res.redirect("/")   
        })

        .catch((error) =>  res.redirect("/celebrities/create") )
})