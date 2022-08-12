const router = require("express").Router();
const CelebrityModel = require("../models/Celebrity.model");

// all your routes here
// iteration 4: Listing all celebrities
router.get("/", (req, res) => {
  CelebrityModel.find()
    .then((allCelebrities) =>
      res.render("celebrities/celebrities", { allCelebrities })
    )
    .catch((err) => console.log(err));
});

// iteration 3: Create a new celebrity
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
