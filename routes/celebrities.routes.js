const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// GET route to display the "create celebrity" form
router.get("/create", (req, res, next) => {
    res.render("celebrities/new-celebrity");
});

// POST route to handle form submission for creating a new celebrity
router.post("/create", async (req, res) => {
    const { name, occupation, catchphrase } = req.body;

    try {
        await Celebrity.create({ name, occupation, catchphrase });
        res.redirect("/celebrities"); // Redirect to the list of celebrities
    } catch (error) {
        console.error("Error creating celebrity:", error);
        res.render("celebrities/new-celebrity", { errorMessage: "Failed to create celebrity. Please try again." });
    }
});

// GET route to display the list of celebrities
router.get("/", async (req, res) => {
  try {
      const celebrities = await Celebrity.find(); // Fetch all celebrities
      res.render("celebrities/celebrities", { celebrities }); // Render view and pass data
  } catch (error) {
      console.error("Error fetching celebrities:", error);
      res.status(500).render("error", { errorMessage: "Failed to retrieve celebrities." });
  }
});

module.exports = router;