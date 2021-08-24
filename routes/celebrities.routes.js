// starter code
const router = require("express").Router();
const CelebrityModel = require("../models/Celebrity.model.js");

// all routes
router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  CelebrityModel.create({ name, occupation, catchPhrase })
    .then((celebrity) => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      console.log("Error while creating new celebrity:", err);
      res.render("celebrities/new-celebrity");
    });
});

router.get("/", (req, res, next) => {
  CelebrityModel.find()
    .then((celebrities) => {
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch((err) =>
      console.log("Error while searching for all celebrities:", err)
    );
});

// exporting routes file
module.exports = router;
