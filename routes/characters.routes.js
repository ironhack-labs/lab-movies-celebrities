// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Character = require("../models/Character.model")

router.get("/create", (req, res) => {
    res.render("characters/new-character");
})


router.post("/create", (req, res) => {
     
    Character.create(req.body)

      .then(res.redirect("/character-list"))
      .catch(res.render("characters/new-character"))
  
})

router.get("/character-list", (req, res, next) => {

    Character.find()
      .then(allCharacters => res.render("characters/character-list", { allCharacters }))
      .catch(err => console.log(err))
  
  });


module.exports = router;
