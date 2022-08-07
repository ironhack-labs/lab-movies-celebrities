const router = require("express").Router();
const celebrityModel = require("../models/Celebrity.model");

// all your routes here
router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res) => {
  //   const { name, occupation, catchPhrase } = req.body;
  celebrityModel
    .create(req.body)
    .then(() => res.redirect("/celebrities"))
    .catch((err) => {
      console.log("Failed to create a celebrity", err);
      res.render("celebrities/new-celebrity");
    });
});

module.exports = router;
