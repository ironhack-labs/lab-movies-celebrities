//const { render } = require("../app");
const Celebrity = require("../models/Celebrity.model")

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", async (req, res) => {
  try {
    const { name, occupation, catchphrase } = req.body;

    const newCelebrity = await Celebrity.create({
      name,
      occupation,
      catchphrase,
    });
    res.redirect("celebrities");
  }
  catch (err) {
    res.redirect("/celebrities/create");
  }
});

router.get("/celebrities/celebrities", async (req, res) => {
  try {
    const celebrities = await Celebrity.find()
    res.render("celebrities/celebrities", { celebrities });

  }
  catch (err) {
    console.log(err)
  }
});

module.exports = router;