const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

//CREATE CELEBRITIES
router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  Celebrity.create(req.body)
    .then((celebrities) => {
      res.redirect("/celebrities", celebrities);
    })
    .catch((error) => {
      console.log("error en '/create'", error);
      res.redirect("celebrities/new-celebrity");
      next();
    });
});


//READ CELEBRITIES
router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("celebrities/celebrities", celebrities);
    })
    .catch((error) => {
      console.log("error en '/celebrities'", error);
      next();
    });
});


module.exports = router;
