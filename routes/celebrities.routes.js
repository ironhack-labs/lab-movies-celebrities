const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities",(req,res,next)=>{
    Celebrity.find()
    .then(celebrityFromDB=>{
        res.render("celebrities/celebrities",{celebrities: celebrityFromDB})
    })
    .catch((e) => {
        console.log("error getting celebrities....", e);
        next(e);
      });
})

router.get("/celebrities/create", (req, res, next) => {
  Celebrity.find()
    .then(() => {
      res.render("celebrities/new-celebrity");
    })
    .catch((e) => {
      console.log("error getting celebrities....", e);
      next(e);
    });
});

router.post("/celebrities/create", (req, res, next) => {
  const celebrityDetails = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPrase,
  };
  Celebrity.create(celebrityDetails)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((e) => {
      console.log("error getting celebrities....", e);
      next(e);
    });
});

module.exports = router;
