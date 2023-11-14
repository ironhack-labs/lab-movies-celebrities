// routes/celebrities.routes.js

const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model"); // Import the Celebrity model

// GET route to show form to create a celebrity
// ... (previous code remains unchanged)

// POST route to create a new celebrity
router.post("/celebrities/create", async (req, res) => {
  try {
    const { name, occupation, catchPhrase } = req.body;
    await Celebrity.create({ name, occupation, catchPhrase }); // Create a new celebrity

    res.redirect("/celebrities"); // Redirect to the list of celebrities (to be created in the next iteration)
  } catch (error) {
    res.render("celebrities/new-celebrity"); // Render the form again if there's an error
  }
});
// GET route to show form to create a celebrity
router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrity"); // Renders the new-celebrity view
});

module.exports = router;
