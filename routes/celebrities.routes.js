// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const celebritieModel = require("../models/Celebrity.model.js");

// all your routes here

//GET "/celebrities/create"

router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity.hbs");
});
  router.post("/create", async (req, res, next) => {
    try {
      const response = await celebritieModel.create({

        name: req.body.title,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase,

      });

      res.redirect("/")

    } catch(err) {

      next(err);
      res.redirect("/new-celebrity.hbs")
    }
  });

  //GET


module.exports = router;
