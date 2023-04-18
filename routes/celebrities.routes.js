// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const CelebrityModel = require("../models/Celebrity.model");

//Find celebrities

router.get("/celebrities", (req, res, next) => {
  CelebrityModel.find()
    .then((celebrities) => {
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch((error) => {
      console.log("Error when finding celebrities");
      next(error);
    });
});

//Create and post celebrities

router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  CelebrityModel.create({ name, occupation, catchPhrase })
    .then((createdCelebrity) => {
      console.log(createdCelebrity);
      res.redirect("/celebrities");
    })
    .catch((err) => res.render("celebrities/new-celebrity"));
});

/* router.post("/celebrities/create", async (req, res, next) => {
    try {
      const { name, occupation, catchPhrase } = req.body;
      await Celebrity.create({ name, occupation, catchPhrase });
      res.redirect("/celebrities");
    } catch (err) {
      res.render("celebrities/new-celebrity");
    }
  }); */

module.exports = router;
