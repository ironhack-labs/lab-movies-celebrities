const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity.model");


router.get("/celebrities/new", (req, res, next) => res.render("celebrities-views/new-celebrity"));



router.post('/celebrities/create', (req, res, next) => {
  console.log("new celebrity: ", req.body);
  Celebrity.create(req.body)
    .then(()=> res.redirect("/celebrities"))
    .catch((err) => console.log(`Error while saving a new celebrity to DB: ${err}`));
});    

  

router.get("/celebrities", (req, res, next) => {
 Celebrity.find()
    .then((celebrityFromDB) => res.render("celebrities-views/celebrities", { celebrityFromDB }))
    .catch((err) => console.log(`Error while getting all celebrities from DB: ${err}`));
});



router.post("/celebrities/:celebrityId/delete", (req, res, next) => {
  Celebrity.findByIdAndRemove(req.params.celebrityId)
    .then(() => res.redirect("/celebrities"))
    .catch((err) => console.log(`Error while deleting a celebrity from DB: ${err}`));
});



router.get("/celebrities/:id/edit", (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((foundCeleb) => {
          res.render("celebrities-views/edit-celebrity", {foundCeleb})
      })
      .catch((err) => console.log(`Error getting celebrity from DB for editing: ${err}
    })`))
});



router.post("/celebrities/:id", (req, res, next) => {
  const {name, occupation, catchPhrase} = req.body

 Celebrity.findByIdAndUpdate(req.params.id,  {name, occupation, catchPhrase} , { new: true })
    .then((updatedCelebrity) => {
      console.log("updated:", updatedCelebrity);
      res.redirect(`/celebrities/${updatedCelebrity._id}`);
    })
    .catch((err) => console.log(`Error while saving updates to a celebrity: ${err}`));
});



router.get("/celebrities/:id", (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((foundCeleb) => {
      console.log(foundCeleb);
      res.render("celebrities-views/celebrity-details", {foundCeleb});
    })
    .catch((err) => console.log(`Error while getting a celebrity details from DB: ${err}`));
});





module.exports = router;