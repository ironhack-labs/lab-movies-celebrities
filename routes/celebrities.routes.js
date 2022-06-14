const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/celebrities/create", (req, res, next) => res.render("celebrities/new-celebrity"));

router.post("/celebrities/create", (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    
          Celebrity.create({ name, occupation, catchPhrase })
          .then(() => res.redirect('/celebrities'))
          .catch(() => res.render("/celebrities/new-celebrity"));
      });


  router.get("/celebrities", (req, res, next) => {
    Celebrity.find() 
      .then((celebritiesFromDB) => res.render("celebrities/celebrities", { celelebrities: celebritiesFromDB }))
      .catch((err) => {
        console.log(`Error while getting users from the DB: ${err}`);
        next(err);
      });
  });




module.exports = router;