// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", async (req, res, next) => {
  const { body } = req;
  const celebritie = await Celebritie.create(body);
  res.redirect("/");
});

module.exports = router;
