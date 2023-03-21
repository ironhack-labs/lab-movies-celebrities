const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movies = require("../models/Movie.model");

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesArr) => {
      const data = {
        celebrities: celebritiesArr,
      };
      res.render("celebrities/celebrities", data);
    })
    .catch((e) => {
      console.log("Error to display list of celebrities", e);
    });
});

router.get("/new-celebrity", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/new-celebrity", (req, res, next) => {
  const newCelebrity = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchphrase: req.body.catchphrase,
  };

Celebrity.create(newCelebrity)
.then(() => {
  res.redirect("celebrities");
})
.catch((e) => {
  console.log("error at create", e);
});
});

module.exports = router;
