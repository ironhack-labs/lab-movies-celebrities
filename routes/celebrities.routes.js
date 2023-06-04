const router = require("express").Router();

/* GET Celebrities page */
router.get("/celebrities", (req, res, next) => {
  res.render("celebrities");
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
      console.log('error ', err),
      res.render("celebrities/new-celebrity", { err });
    });
});

module.exports = router;
