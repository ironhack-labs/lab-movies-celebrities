const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

// all your routes here
router.get("/celebrities/create", (req, res) => {
  console.log(res.render);
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res) => {
  console.log(req.body);
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase,
  })
    .then(() => {
      res.redirect("/celebrities");
    })
    .then(() => {
      res.render("/celebrities/create");
    })
    .catch((err) => {
      console.log("Error while creating the celebrities:", err);
    });
});

module.exports = router;
