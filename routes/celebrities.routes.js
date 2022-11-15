// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const Celebrity = require('../models/Celebrity.model');
const router = require("express").Router();

/* GET home page */
router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  // console.log(req.body);
  const { name, ocupation, catchPhrase } = req.body;

  Celebrity.create({ name, ocupation, catchPhrase })
    // .then(bookFromDB => console.log(`New book created: ${bookFromDB.title}.`))
    .then(() => res.redirect("/celebrities/create"))
    .catch((error) => res.redirect("celebrities/new-celebrity"));
});
  
module.exports = router;




