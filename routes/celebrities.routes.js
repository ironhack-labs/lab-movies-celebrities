const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res) => {
  Celebrity.create(req.body)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((err) => res.render("celebrities/new-celebrity"));
});

router.get("/celebrities", (req, res)=>{
 Celebrity.find()
 .then((celeb)=>{
    res.render("celebrities/celebrities", {celeb})
 })
 .catch((err) => res.send(err))
})

module.exports = router;
