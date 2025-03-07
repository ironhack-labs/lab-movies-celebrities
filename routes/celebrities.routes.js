const router = require("express").Router();

// GET /celebrities - Display all celebrities
router.get("/", (req, res, next) => {
  const Celebrity = require("../models/Celebrity.model");
  
  Celebrity.find()
    .then(celebrities => {
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch(err => {
      console.error("Error retrieving celebrities:", err);
      next(err);
    });
});

// GET /celebrities/create - Display form to create a celebrity
router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity", { title: "Add New Celebrity" });
});

// POST /celebrities/create - Handle form submission to create a celebrity
router.post("/create", (req, res, next) => {
  const Celebrity = require("../models/Celebrity.model");
  const { name, occupation, catchPhrase } = req.body;
  
  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch(err => {
      console.error("Error creating celebrity:", err);
      next(err);
    });
});

module.exports = router; 