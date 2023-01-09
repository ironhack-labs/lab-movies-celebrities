// const app = require('../app');
const Celebrity = require("../models/Celebrity.model");
const router = require("express").Router();

router.get("/celebrities/create", (req, res) => {
  console.log("working");
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then((newCeleb) => {
      console.log(newCeleb);
      res.redirect("/celebrities");
    })
    .catch((error) => {
        console.log(`This is your error: ${error}`);
        next(error)
    })
})

router.get('/celebrities', (req,res,next) => {
    Celebrity.find()
    .then(allCelebs => {
        console.log(allCelebs);
        res.render('celebrities/celebrities', {x: allCelebs})
    })
} )

module.exports = router;
