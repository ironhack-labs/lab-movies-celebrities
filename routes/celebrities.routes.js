
const router = require("express").Router();
const CelebrityModel = require('../models/Celebrity.model')


router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity");
  });

router.get("/celebrities", (req, res, next) => {
    CelebrityModel.find()
    .then((AllCelebrities) => res.render('celebrities/celebrities', { AllCelebrities }))
    .catch((err) => next (err))
})








router.post("/celebrities/create",(req, res, next) =>{
    const { name, occupation, catchPhrase } = req.body
    CelebrityModel.create( { name, occupation, catchPhrase })
    .then(() => res.redirect('/celebrities'))
    .catch(() => res.render("celebrities/new-celebrity"))
})


module.exports = router