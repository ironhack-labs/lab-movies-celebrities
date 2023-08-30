// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebs = require("../models/Celebs.model");

// display form to add new celeb
router.get("/celebs/create", (req, res, next) => {
  Celebs.find()
    .then((celebsFromDB) => {
      const data = {
        celebs: celebsFromDB,
      };
      res.render("celebs/new-celeb", data);
    })
    .catch((e) => {
      console.log("Error to display form", e);
      next(e);
    });
});

// process form to add celeb to database
router.post("/celebs/create", (req, res, next) => {
    const newCeleb = {
        name: req.body.name,
        occupation: req.body.name,
        catchPhrase: req.body.catchPhrase,
    };
    Celebs.create(newCeleb)
    .then((newCeleb) => {
        res.redirect("/celebs");
    })
    .catch((e) => {
        console.log("Error getting info from form", e);
        res.send("celebs/create")
      });
})

// display all celebs
router.get("/celebs", (req, res, next) => {
  Celebs.find()
    .then((celebsFromDB) => {
      const data = {
        celebs: celebsFromDB,
      };
      res.render("celebs/celebs", data);
    })
    .catch((e) => {
      console.log("Error getting list of books from DB", e);
      next(e);
    });
});

module.exports = router;
