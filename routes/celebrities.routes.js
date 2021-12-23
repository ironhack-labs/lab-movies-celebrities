const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

/* GET home page */
router.get("/", (req, res, next) => {
  Celebrity.find()
    .then((results) => {
      res.render("celebrities/celebrities", { celebrities: results });
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res, next) => {
  Celebrity.create(req.body)
    .then((results) => {
      res.redirect("/celebrities");
      console.log("These are the results", results);
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

module.exports = router;
