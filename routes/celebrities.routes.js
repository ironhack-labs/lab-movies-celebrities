// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here

//add new celebrities - render form
router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

//add new celebrites - process form
router.post("/celebrities/create", (req, res) => {
  const newCelebrity = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  };

  Celebrity.create(newCelebrity)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      console.log("error creating celebrities", err);
      res.render("celebrities/new-celebrity");
    });
});

//display all celebrities
router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((allCelebrities) => {
      res.render("celebrities/celebrities", { celebrities: allCelebrities });
    })
    .catch((err) => {
      console.log("error creating celebrities", err).next(err);
    });
});

//edit a celebrity - render the form
router.get("/celebrities/:id/edit", (req, res) => {
  Celebrity.findById(req.params.id)
    .then((celebrityToEdit) => {
      res.render("celebrities/edit-celebrity", celebrityToEdit);
    })
    .catch((err) => console.log("Error editing celebrity", err));
});

//edit a celebrity - process the form
router.post("/celebrities/:id/edit", (req, res) => {
  const id = req.params.id
  const updatedCelebrity = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  };
  Celebrity.findByIdAndUpdate(id, updatedCelebrity)
    .then(() => {
      console.log("Updated details are", updatedCelebrity)
      res.redirect("/celebrities");
    })
    .catch((err) =>
      console.log("There was an error updating the celebrity", err)
    );
});

//delete a celebrity
router.get("/celebrities/:id/delete", (req, res) => {
  Celebrity.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((err) => console.log("The was an error deleting a celebrity", err));
});

module.exports = router;
