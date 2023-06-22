const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");


/* GET Celebrities page */
router.get("/", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch((error) => {
      console.log("Error: ", err);
      res.render("error", { err });
    });
});

router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  const newCelebrity = new Celebrity({
    name,
    occupation,
    catchPhrase
  });
  // Saving the new celebrity to the database
  newCelebrity.save()
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch(error => {
      console.log("Error: ", err),
      res.render("celebrities/new-celebrity", { err });
    });
});

module.exports = router;
