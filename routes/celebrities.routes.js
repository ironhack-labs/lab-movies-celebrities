// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities/create", (req, res, next) => {
<<<<<<< HEAD
  res.render("celebrities/new-celebrity");
});
=======
    res.render("celebrities/new-celebrity")

})

router.post("/celebrities/create", (req, res, nex) => {
    const newCelebrity = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }
    Celebrity.create(newCelebrity)
    .then( () => {
        res.redirect("celebrities/celebrities")
>>>>>>> a8d736447b66d3e29f4512acf1aedc162452f4d5

router.post("/celebrities/create", (req, res, nex) => {
  const newCelebrity = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  };
  Celebrity.create(newCelebrity)
    .then((response) => {
      res.redirect("/celebrities");
    })
<<<<<<< HEAD
    .catch((err) => {
      console.log("There was an error creating new celebrity", err);
      res.render("celebrities/new-celebrity");
      next();
    });
});
=======
    .catch(()=>{
        res.render("celebrities/new-celebtity")
    })
}) 
>>>>>>> a8d736447b66d3e29f4512acf1aedc162452f4d5

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch((err) => {
      console.log(
        "There was an error getting all the celebrities from DB",
        err
      );
      next();
    });
});
module.exports = router;
