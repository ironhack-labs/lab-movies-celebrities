const CelebrityModel = require("../models/Celebrity.model");

const MONGO_URI =
  process.env.MONGODB_URI ||
  "mongodb://127.0.0.1/lab-movies-celebrities" ||
  "mongodb://localhost:27017/lab-movies-celebrities";

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

//GET list all Celebs
router.get("/celebrities", (req, res, next) => {
  CelebrityModel.find()

    .then((celebsFromDB) => {
      console.log(celebsFromDB);

      res.render("celebrities/celebrities", { celebrities: celebsFromDB });
    })
    .catch((err) => {
      console.log("error getting celebs from DB", err);
      next();
    });
});

//GET celebrity create form
router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

//POST submit the celebrity create form
router.post("/celebrities/create", (req, res, next) => {
  const celebDetails = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  };

  Celebrity.create(celebDetails)
    .then((celebDetails) => {
      res.redirect("/celebrites");
    })
    .catch((err) => {
      res.render("/celebrites/new-celebrity");
      next();
    });
});

module.exports = router;
