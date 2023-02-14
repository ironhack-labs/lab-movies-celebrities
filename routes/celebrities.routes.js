// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model.js");

// all your routes here


//GET "/celebrities/create"

router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity.hbs");
  
});

//POST "/celebrities/create"

router.post("/create", async (req, res, next) => {
  try {
    const response = await Celebrity.insertMany({
      name: req.body.name,
      occupation: req.body.occupation,
      catchPhrase: req.body.catchPhrase,
    });

    res.redirect("/celebrities");
  } catch (err) {
    next(err);
    res.redirect("/celebrities/create");
  }
});


//GET "/celebrities"
router.get("/", async (req, res, next) => {

  try {

    const response = await Celebrity.find()

    res.render("celebrities/celebrities.hbs", {
      eachCelebrity: response
    })


  }catch(err) {
    next(err)
  };

});


module.exports = router;
