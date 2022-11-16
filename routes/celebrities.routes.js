// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
// all your routes here
const Celeb = require("../models/Celebrity.model.js");
//GET
router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity.hbs");
});
//POST
router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celeb.create({ name, occupation, catchPhrase })
    .then((celebfromDb) => res.redirect("/celebrities/"))
    .catch((error) => res.render("celebrities/new-celebrity.hbs"));
});
// GET All
router.get("/celebrities/", (req, res, next) => {
  Celeb.find()
    .then((celebfromDb) =>
      res.render("celebrities/celebrities.hbs", { celeb: celebfromDb })
    )
    .catch((error) => next(error));
});
//BONUS
router.get("/celebrities/:celebId/", (req, res) => {
  const { celebId } = req.params;
  Celeb.findById(celebId)
    .then((celebsFromDB) => {
      res.render("celebrities/celebrities-details.hbs", {
        celeb: celebsFromDB,
      });
    })
    .catch((error) => {
      console.log("Error while retrieving movie details: ", error);
    });
});
//update
router.get("/celebrities/:celebId/edit", (req, res) => {
  const { celebId } = req.params;
  Celeb.findById(celebId)
    .then((theCeleb) => {
      res.render("celebrities/celebrities-edit.hbs", { celeb: theCeleb });
    })
    .catch((error) => {
      console.log("Error while retrieving movie details: ", error);
    });
});
router.post("/celebrities/:celebId/edit", (req, res, next) => {
  const { celebId } = req.params;
  const { name, occupation, catchPhrase } = req.body;

  Celeb.findByIdAndUpdate(
    celebId,
    { name, occupation, catchPhrase },
    { new: true }
  )
    .then((updatedCeleb) => {
      updatedCeleb.save();
    })
    .then(() => res.redirect("/celebrities/"))
    .catch((error) => next(error));
});
module.exports = router;
