const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

//==== Create route to /celebrities
router.get("/", (req, res, next) => {
  Celebrity.find()
    .then((celebFromDB) => {
      res.render("celebrities/celebrities-list", { celebrity: celebFromDB });
    })
    .catch();
});

//===== Create GET-route for /celebrities/new-celebrity
router.get("/new-celebrity", (req, res, next) => {
  Celebrity.find()
    .then((celebrityDetails) => {
      res.render("celebrities/new-celebrity", { celebrity: celebrityDetails });
    })
    .catch((err) => {
      console.log("Error getting celeb details from DB...", err);
    });
});

// ===== Create POST-route for celeb/new-celebrity submit page
router.post("/new-celebrity", (req, res, next) => {
  const { name, occupation, catchphrase } = req.body;
  const celebrityDetails = req.body;

  Celebrity.create(celebrityDetails)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      console.log("Error creating new celeb..", err);
    });
});



module.exports = router;
