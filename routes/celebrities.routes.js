const router = require("express").Router();
const Celebrity = require("./../models/Celebrity.model");

/* GET home page */
router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((data) => res.render("./celebrities/celebrities", { data }))
    .catch((error) => console.error(error));
});

router.get("/celebrities/create", (req, res, next) => {
  res.render("./celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  console.log(name, occupation, catchPhrase);

  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch(() => {
      res.redirect("/celebrities/create");
    });
});

module.exports = router;
