// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
const Celebrity = require('../models/Celebrity.model');

// GET Route 
router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

// POST Route 
router.post("/celebrities/create", async (req, res) => {
  try {
    const {name, occupation, catchPhrase} = req.body;
    await Celebrity.create ({name, occupation, catchPhrase});

    res.redirect("/celebrities");
  } catch (err) {
    console.log(err);
    res.redirect("/celebrities/new-celebrity");
  }
});

//create

router.get("/celebrities", (req, res) => {
  Celebrity.find()
    .then(celebrities => {
      res.render("celebrities/celebrities", { celebrities});
    })
    .catch(error => {
      console.log(error);
    });
});
 




module.exports = router;