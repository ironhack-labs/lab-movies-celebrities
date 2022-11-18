// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

// all your routes here
/* GET create-celeb page */
router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

/* GET celebrity page */

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
        .then(dbCelebrities => {
            res.render("celebrities/celebrities", { celebrities: dbCelebrities })
        })
        .catch(err => console.log(err))
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