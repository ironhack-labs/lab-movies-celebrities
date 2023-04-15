const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model.js");

router.get("/", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch((error) => {
      console.log("Error when listing celebrities", error);
      next(error);
    });
});

router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});
router.post("/create", (req, res, next) => {
  const { name, occupation, catchphrase } = req.body;

  Celebrity.create({ name, occupation, catchphrase })
    .then((celebrityFromDB) => res.redirect("/celebrities"))
    .catch((error) => res.render("celebrities/new-celebrity"));
});

module.exports = router;
