const { route } = require(".");
const Celebrities = require("../models/Celebrity.model");

const router = require("express").Router();

// all your routes here
router.get("/celebrities", (req, res) => {
  Celebrities.find()
    .then((CelebrityList) => {
      res.render("celebrities/celebrities", { CelebrityLists: CelebrityList });
    })
    .catch((err) => console.log(err));
});

router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.get("/new-celebrity", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  console.log(req.body);

  Celebrities.create({ name, occupation, catchPhrase }).then((createdCeleb) => {
    res.redirect("/celebrities");
  });
});

module.exports = router;
