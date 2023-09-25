// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model.js");

router.get("/celebrities/create", (req, res, next) => {
  Celebrity.find()
    .then((allCelebrities) => {
      res.render("celebrities/new-celebrity", { celebrities: allCelebrities });
    })
    .catch((error) => {
      console.log("Celebrity error: ", error);
      next(error);
    });
});

router.post("/celebrities/create", (req, res, next) => {
  // console.log("The form data: ", req.body);
  const { name, occupation, catchPhrase } = req.body;
  return Celebrity.create({ name, occupation, catchPhrase })
    .then((allCelebrities) => {
      //console.log("Response statusCode: ", res.statusCode);
      if (res.statusCode !== 200) {
        res.render("celebrities/new-celebrity", {
          celebrities: allCelebrities,
        });
      } else {
        res.redirect("/celebrities");
      }
    })
    .catch((error) => {
      console.log("Celebrity create error: ", error);
      next(error);
    });
});

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((allCelebrities) => {
      res.render("celebrities/celebrities", { celebrities: allCelebrities });
    })
    .catch((error) => {
      console.log("Celebrity error: ", error);
      next(error);
    });
});
// all your routes here

module.exports = router;
