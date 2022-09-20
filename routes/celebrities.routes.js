// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const { Celebrity } = require("../models/Celebrity.model");

// all your routes here

router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", async (req, res) => {
  console.log(req.body);
  try {
    const newCelebrity = new Celebrity({ ...req.body });
    await newCelebrity.save();
    res.redirect("/celebrities");
  } catch (err) {
    console.log("Sorry, there was an error: ", err);
    res.render("celebrities/new-celebrity");
  }
});

router.get("/", async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find();
    console.log(celebrities);
    res.render("celebrities/celebrities", { celebrities });
  } catch (err) {
    console.log("Sorry, there was an error: ", err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const foundCeleb = await Celebrity.findById(req.params.id);
    res.render("celebrities/celebrity-details", {
      celebrity: foundCeleb,
      id: req.params.id,
    });
  } catch (err) {
    console.log("Sorry, there was an error: ", err);
  }
});

router.post("/:id/delete", async (req, res, next) => {
  try {
    await Celebrity.findByIdAndDelete(req.params.id);
    res.redirect("/celebrities");
  } catch (err) {
    console.log("Sorry, there was an error: ", err);
  }
});

router.get("/:id/edit", async (req, res, next) => {
  try {
    console.log(req.params.id);
    const celebToEdit = await Celebrity.findById(req.params.id);
    res.render("celebrities/edit-celebrity", {
      celebrity: celebToEdit,
    });
  } catch (err) {
    console.log("Sorry, there was an error: ", err);
  }
});

router.post("/:id", async (req, res, next) => {
  try {
    const { name, occupation, catchPhrase } = req.body;
    const editedCeleb = await Celebrity.findByIdAndUpdate(req.params.id, {
      name,
      occupation,
      catchPhrase,
    });
    res.redirect("/celebrities");
  } catch (err) {
    console.log("Sorry, there was an error: ", err);
  }
});

module.exports = router;
