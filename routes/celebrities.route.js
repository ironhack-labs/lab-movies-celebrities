// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
/* GET create-celeb page */
router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

//POST create-celeb page

router.post("/create", async (req, res, next) => {

  const { name, occupation, catchPhrase } = req.body;
  
  Celebrity.create({ name, occupation, catchPhrase });
  res.redirect(`/celebrities`)
  .catch(err => console.log(err)
  .then(res.redirect("celebrities/new-celebrity")))
});


module.exports = router;