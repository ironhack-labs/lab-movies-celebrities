const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/create", (req, res) => {
  Celebrity.find()
    .then(celebrities => {
      res.render("celebrities/new-celebritie", { celebrities });
    })
    .catch(error => {
      res.render("error", { errorMessage: "Error fetching data" });
    });
});

router.post('/create', (req, res) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(error => {
      res.render('celebrities/new-celebrity', { errorMessage: 'Error creating celebrity' });
    });
});

router.get('/', (req, res) => {
  Celebrity.find()
    .then(celebrities => {
      res.render('celebrities/celebrities', { celebrities });
    })
    .catch(error => {
      res.render('error', { errorMessage: 'Error fetching data' });
    });
});

  
  module.exports = router;