const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// GET
router.get("/celebrities/create", (req, res) => {
  res.render("new-celebrity");
});

// POST
router.post("/celebrities/create", (req, res, next) => {
  const { newCelebrity } = req.body;
  Celebrity.findOne({ newCelebrity })
    .then((result) => {
      if (!result) {
        Celebrity.create({ newCelebrity }).then(() =>
          res.redirect("/celebrities")
        );
      } else {
        res.render("celebrities/create", {
          message: "It seems it is already created",
        });
      }
    })
    .catch((err) => {
      console.log(`Error while creating a new user: ${err}`);
    });
});

module.exports = router;
