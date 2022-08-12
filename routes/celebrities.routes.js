const router = require("express").Router();
const CelebrityModel = require("../models/Celebrity.model");

// all your routes here
router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res) => {
  CelebrityModel.create(req.body)
    .then(() => res.redirect("/celebrities"))
    .catch((err) => {
      console.log(err);
      res.render("celebrities/new-celebrity");
    });
});

module.exports = router;
