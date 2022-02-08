
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

//==== Create route to /celebrities
router.get("/", (req, res, next) => {
  Celebrity.find()
    .then((celebFromDB) => {
      res.render("celebrities/celebrities-list", { celebrities: celebFromDB });
    })
    .catch();
});




module.exports = router;
