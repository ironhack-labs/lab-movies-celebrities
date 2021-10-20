const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model")

router.get("/celebrities/create", (req, res, next)=>{
  res.render("celebrities/new-celebrity")
})

router.post("/celebrities/create", (req, res, next)=>{
  const {name, occupation, catchPhrase} = req.body;
  Celebrity
    .create({name, occupation, catchPhrase})
    .then(()=>{
      //res.send("that's ok")
      res.redirect("/celebrities")
    })
    .catch( (error) => {
      console.log("Error adding new book to DB", error);
      next(error);
  });

})

router.get("/celebrities", (req, res, next)=>{
  res.render("celebrities/celebrities")
})

router.get("/movies", (req, res, next)=>{
  res.render("movies/movies")
})

module.exports = router;