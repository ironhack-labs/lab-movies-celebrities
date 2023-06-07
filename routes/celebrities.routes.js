// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrities = require("../models/Celebrity.model");

//CREATE: display form
router.get("/celebrities/create", (req, res, next) => {
  Celebrities.find()
    .then((celebritiesFromDB) => {
      res.render("celebrities/new-celebrity", {
        celebritiesArr: celebritiesFromDB,
      });
    })
    .catch((err) => {
      console.log("oops, we could not create it");
    });
});

//CREATE: process form
router.post("/celebrities/create", (req, res, next) => {
  const newCelebrity = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  };

  Celebrities.create(newCelebrity)
    .then((newCelebrity) => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      console.log("error creating new celebrity");
      res.redirect("celebrities/new-celebrity");
    });
});

// READ: display all celebrities
router.get("/celebrities", (req, res, next) => {
  Celebrities.find()

    .then((celebritiesFromDB) => {
      const data = {
        celebrities: celebritiesFromDB,
      };
      console.log(data);
      res.render("celebrities/celebrities", data);
    })
    .catch((err) => {
      console.log("There is an error");
    });
});

module.exports = router;
