const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model")


/* GET home page */
router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});



router.post("/celebrities/create", (req,res,next) => {
    console.log(req.body);
    const celebName = req.body.name;
    const celebOccupation = req.body.occupation;
    const celebCatchPhrase = req.body.catchPhrase;

    Celebrity.create({
      name: celebName,
      occupation: celebOccupation,
      catchPhrase: celebCatchPhrase
    })
      .then(savedCeleb => {
        console.log(savedCeleb);
        res.send('Celebrity was saved!');
      })
      .catch(err => {
        console.log(err);
        res.render("celebrities/new-celebrity");
      })
  });
  



  router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
        .then(celebrityList => {
          console.log(celebrityList);
          res.render('celebrities/celebrities', {celebrityList});
        })
        .catch(err => {
          console.log(err);
        })
  });
  

module.exports = router;
