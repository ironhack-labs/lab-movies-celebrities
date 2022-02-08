const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
/* GET home page */
router.get("/", (req, res, next) => {
  Celebrity.find().then((results) => {
    res.render("celebrities/celebrities", { results });
  });
});

router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res) => {
  Celebrity.create(req.body)
    .then((results) => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      console.log("Something went wrong adding the celeb", err);
      res.render("celebrities/new-celebrity");
    });
});
module.exports = router;
