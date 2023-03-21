const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');

// // GET celebrities
//  router.get("/celebrities", (req, res, next) => {
//    Celebrity.find({})
//      .then(celebritiesFromDb => {
//        res.render("/celebrities/celebrities", {
//          celebrity: celebritiesFromDb,
//        });
//      })
//      .catch((e) => {
//        console.log("error getting celebrities from DB", e);
//        next(e);
//      });
//  });

 router.get("/celebrities", (req,res,next)=>{
  res.render("celebrities/celebrities.hbs")
  })


router.get("/new-celebrity", (req, res, next)=>{
res.render("celebrities/new-celebrity.hbs")
});

router.post("/celebrities", (req, res, next) => {
    
    const newCelebrity={
        name: req.body.name,
        occupation: req.body.occupation,
        catchphrase: req.body.catchphrase
    }

    Celebrity.create(newCelebrity)
    .then(celebrityFromDb=>{
        res.redirect("/celebrities")
    })
    .catch((e)=>{
        console.log("error at create",e);
    })
});


module.exports = router;
