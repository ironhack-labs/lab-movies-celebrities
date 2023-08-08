// routes/celebrities.routes.js
const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// GET route to show the form for creating a new celebrity
router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

// POST route to create a new celebrity
router.post("/create", async (req, res) => {
    const { name, occupation, catchPhrase } = req.body;
  
    try {
      const newCelebrity = await Celebrity.create({
        name,
        occupation,
        catchPhrase,
      });
      console.log("New celebrity created:", newCelebrity);
      res.redirect("/celebrities"); // Redirect to the page with the list of celebrities (will be created in the next iteration)
    } catch (error) {
      res.render("celebrities/new-celebrity", { errorMessage: "Error creating the celebrity." });
    }
  });
  // GET route to show the list of all celebrities
  router.get("/", async (req, res) => {
    try {
      const celebrities = await Celebrity.find();
      res.render("celebrities/celebrities", { celebrities });
    } catch (error) {
      console.error("Error retrieving celebrities:", error);
      res.render("error", { errorMessage: "Error retrieving celebrities." });
    }
  });
  //
  router.get("/create", (req, res) => {
    res.render("celebrities/new-celebrity");
  });
  
  // POST route to handle form submission for creating a new celebrity
  router.post("/create", async (req, res) => {
    try {
      await Celebrity.create(req.body);
      res.redirect("/celebrities");
    } catch (error) {
      console.error("Error creating a new celebrity:", error);
      res.render("error", { errorMessage: "Error creating a new celebrity." });
    }
  });
  // GET route to show the form for editing a specific celebrity's details
  router.get("/:id", async (req, res) => {
    const celebrityId = req.params.id;
  
    try {
      const celebrity = await Celebrity.findById(celebrityId);
      const movies = await Movie.find({ cast: celebrityId });
      res.render("celebrities/celebrity-details", { celebrity, movies });
    } catch (error) {
      console.error("Error fetching celebrity details:", error);
      res.render("error", { errorMessage: "Error fetching celebrity details." });
    }
  });

  // GET route to show the form for editing a specific celebrity's details
router.get("/:id/edit", async (req, res) => {
    const celebrityId = req.params.id;
  
    try {
      const celebrity = await Celebrity.findById(celebrityId);
      res.render("celebrities/edit-celebrity", { celebrity });
    } catch (error) {
      console.error("Error fetching celebrity details for editing:", error);
      res.render("error", { errorMessage: "Error fetching celebrity details for editing." });
    }
  });
  
  // GET route to show the form for editing a specific celebrity's details
router.get("/:id/edit", async (req, res) => {
    const celebrityId = req.params.id;
  
    try {
      const celebrity = await Celebrity.findById(celebrityId);
      res.render("celebrities/edit-celebrity", { celebrity });
    } catch (error) {
      console.error("Error fetching celebrity details for editing:", error);
      res.render("error", { errorMessage: "Error fetching celebrity details for editing." });
    }
  });
  
  // POST route to handle form submission for editing a specific celebrity's details
  router.post("/:id/edit", async (req, res) => {
    const celebrityId = req.params.id;
  
    try {
      await Celebrity.findByIdAndUpdate(celebrityId, req.body);
      res.redirect(`/celebrities/${celebrityId}`);
    } catch (error) {
      console.error("Error updating the celebrity:", error);
      res.render("error", { errorMessage: "Error updating the celebrity." });
    }
  });

  router.post("/:id/delete", async (req, res) => {
    const celebrityId = req.params.id;
  
    try {
      await Celebrity.findByIdAndRemove(celebrityId);
      res.redirect("/celebrities");
    } catch (error) {
      console.error("Error deleting the celebrity:", error);
      res.render("error", { errorMessage: "Error deleting the celebrity." });
    }
  });

module.exports = router;
