// Iteration #1: Setting the folders/files structure

// routes/celebrities.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here

// // Renders celebrities.hbs in the celebrities folder
// router.get("/", (req, res) => {
//   res.render("celebrities/celebrities");
// });

// Renders new-celebrity.hbs in the celebrities folder
router.get("/new", (req, res) => {
  res.render("celebrities/new-celebrity");
});

// Iteration #3: Adding New Celebrities

// GET Route to show form to create a new celebrity
router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

// POST route to Send the data from the form to this route to create the celebrity and save it to the database
router.post("/create", (req, res) => {
  // Create a new instance of the Celebrity model with data from the form
  const newCelebrity = new Celebrity({
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  });

  // Save the new celebrity to the database
  newCelebrity
    .save()
    .then(() => {
      // Redirect to the page with the list of celebrities
      res.redirect("/celebrities");
    })
    .catch((error) => {
      // If there's an error, render the form again with an error message
      res.render("celebrities/new-celebrity", { error: error.message });
    });
});

// Iteration #4: Listing Our Celebrities

// GET route to show all celebrities
router.get("/", (req, res) => {
  // Retrieve all celebrities from the database
  Celebrity.find()
    .then((celebrities) => {
      // If successful, render the celebrities view with the list of celebrities
      res.render("celebrities/celebrities", { celebrities });
      console.log(celebrities);
    })
    .catch((error) => {
      // If there's an error, render an error page or handle it accordingly
      res.status(500).send("Error retrieving celebrities from the database.");
    });
});

// Bonus for Celebrity model
// GET route to show the details of a specific celebrity
router.get("/:id", (req, res) => {
  const { id } = req.params;

  Celebrity.findById(id)
    .then((celebrity) => {
      res.render("celebrities/celebrity-details", { celebrity });
    })
    .catch((error) => {
      console.error("Error fetching celebrity details:", error);
      res.status(500).send("Error retrieving celebrity from the database.");
    });
});

// GET route to show the edit form for a celebrity
router.get("/:id/edit", (req, res) => {
  const { id } = req.params;

  Celebrity.findById(id)
    .then((celebrityToEdit) => {
      res.render("celebrities/edit-celebrity", { celebrity: celebrityToEdit });
    })
    .catch((error) => {
      console.error("Error fetching celebrity for edit:", error);
      res.status(500).send("Error retrieving celebrity for edit.");
    });
});

// POST route to update a celebrity
router.post("/:id", (req, res) => {
  const { id } = req.params;
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase })
    .then(() => {
      res.redirect(`/celebrities/${id}`);
    })
    .catch((error) => {
      console.error("Error updating celebrity:", error);
      res.status(500).send("Error updating celebrity.");
    });
});

// POST route to delete a celebrity
router.post("/:id/delete", (req, res) => {
  const { id } = req.params;

  Celebrity.findByIdAndRemove(id)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((error) => {
      console.error("Error deleting celebrity:", error);
      res.status(500).send("Error deleting celebrity.");
    });
});

module.exports = router;
