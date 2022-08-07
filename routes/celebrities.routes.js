const router = require("express").Router();
const celebrityModel = require("../models/Celebrity.model");

// LIST ALL CELEBRITIES FROM DB
router.get("/", (req, res) => {
  celebrityModel
    .find()
    .then((allCelebrities) =>
      res.render("celebrities/celebrities", { allCelebrities })
    )
    .catch((err) => console.log("Something went wrong", err));
});

// CREATE NEW CELEBRITY
router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res) => {
  celebrityModel
    .create(req.body)
    .then(() => res.redirect("/celebrities"))
    .catch((err) => {
      console.log("Failed to create a celebrity", err);
      res.render("celebrities/new-celebrity");
    });
});

module.exports = router;
