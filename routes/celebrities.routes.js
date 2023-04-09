// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const CelebrityModel = require("../models/Celebrity.model");

// route to display the new celebrity form / creation
router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

// route to post /submit the new celebrity
router.post("/create", async (req, res) => {
  try {
    const newCelebrity = await CelebrityModel.create(req.body);
    res.redirect("/celebrities/celebrities");
  } catch (err) {
    console.log(err);
    res.redirect("/celebrities/new-celebrity");
  }
});

// route to display the list of created celebrities
router.get("/celebrities", async (req, res) => {
  try {
    const allCelebrities = await CelebrityModel.find();
    res.render("celebrities/celebrities", { allCelebrities });
  } catch (err) {
    console.log(err);
  }
});

// route to show each celebrity details
router.get("/:id", async (req, res) => {
  try {
    const oneCelebrity = await CelebrityModel.findById(req.params.id);
    console.log(oneCelebrity);
    res.render("celebrities/celebrity-details", { oneCelebrity });
  } catch (err) {
    console.log(err);
  }
});

// route to delete a celebrity
router.post("/:id/delete", (req, res, next) => {
  const { id } = req.params;
  CelebrityModel.findByIdAndDelete(id)
    .then(() => res.redirect("/celebrities/celebrities"))
    .catch((error) => next(error));
});

// route to edit celebrity page
router.get("/:id/edit", async (req, res) => {
  try {
      const oneCelebrity = await CelebrityModel.findById(req.params.id);
      res.render("celebrities/edit-celebrity", { oneCelebrity });
  } catch (err) {console.log(err)}
});

// route to display edited celebrity
router.post("/:id", async (req, res) => {
  try {
      const newCelebValues = req.body;
      const { id } = req.params;
      const editedCelebrity = await CelebrityModel.findByIdAndUpdate(id, newCelebValues, {new: true});
    res.redirect(`/celebrities/${id}`);
  } catch (err) {
      console.log(err);
      res.redirect("/celebrities/celebrity-details");
  }
});

module.exports = router;
