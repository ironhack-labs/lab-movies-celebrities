// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here

//READ: List all celebs
router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
    .then(celebsFromDB => {
        res.render("celebrities/celebrities", {celebrities: celebsFromDB});
    })
    .catch((err) => {
        console.log("Error getting authors from DB...", err);
        next(err);
      });
})

//Create a Celebrity

router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity");
})

//Process Celebrity creation

router.post("/celebrities/create", (req, res, next) => {
  const celebrityData = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  };

  Celebrity.create(celebrityData)
    .then((createdCelebrity) => {
     res.redirect("/celebrities");
    })
    .catch((err) => {
      console.log("Error getting authors from DB...", err);
      next(err);
    });
});



module.exports = router;