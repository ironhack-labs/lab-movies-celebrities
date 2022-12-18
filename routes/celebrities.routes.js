const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity");
  });

  router.post("/celebrities/create", (req, res, next) => {
    // console.log(req.body);
    const { name, occupation, catchPhrase } = req.body;

    Celebrity.create({ name, occupation, catchPhrase })
      .then(() => res.redirect("/celebrities"))
      .catch((error) => res.render("celebrities/new-celebrity"));
  });

  router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
    .then((Celebrity) => res.render("celebrities/celebrities", Celebrity))
    .catch((error) => res.render("error"));

  });

  router.get("/details2/:id", (req,res, next) => {
    const { id } = req.params
    Celebrity.findById(id)
    // .populate('cast')
    .then((result)=>{
      console.log(result)
      res.render("celebrities/celebrity-details", {result})})
  })
module.exports = router;