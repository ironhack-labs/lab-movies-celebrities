const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

//GET Celebrities
router.get("/", async (req, res) => {
  const celebrities = await Celebrity.find();
  res.render("celebrities/celebrities", { celebrities });
});

// GET create
router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

// POST create
router.post("/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findOne({ name, occupation, catchPhrase })
    .then((result) => {
      if (!result) {
        Celebrity.create({ name, occupation, catchPhrase }).then(() =>
          res.redirect("/celebrities")
        );
      } else {
        res.render("celebrities/new-celebrity", {
          message: "It seems it is already created",
        });
        return;
      }
    })
    .catch((err) => {
      console.log(`Error while creating a new user: ${err}`);
    });
});

module.exports = router;
