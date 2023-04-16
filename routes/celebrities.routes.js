const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here
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

router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then((celebrityFromDB) => {
      if (!celebrityFromDB) {
        Celebrity.create({
          name,
          occupation,
          catchPhrase,
        }).then(() => {
          res.redirect("/celebrities");
        });
      } else {
        res.render("celebrities/new-celebrity", {
          message: "It seems you are already registered. 😁  ",
        });
        return;
      }
    })
    .catch((err) =>
      console.log(`Error while creating a new celebrity: ${err}`)
    );
});

module.exports = router;
