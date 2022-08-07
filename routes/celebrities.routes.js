const router = require("express").Router();
const celebrityModel = require("../models/Celebrity.model");

// LIST ALL CELEBRITIES FROM DB
router.get("/", (req, res) => {
  celebrityModel
    .find()
    .then((allCelebrities) =>
      res.render("celebrities/celebrities", { allCelebrities })
    )
    .catch((err) => console.log("Something went wrong", err));
});

// CREATE NEW CELEBRITY
router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res) => {
  celebrityModel
    .create(req.body)
    .then(() => res.redirect("/celebrities"))
    .catch((err) => {
      console.log("Failed to create a celebrity", err);
      res.render("celebrities/new-celebrity");
    });
});

// DETAILS PAGE
router.get("/:id", (req, res) => {
  celebrityModel
    .findById(req.params.id)
    .then((selectedCeleb) => {
      const { _id, name, occupation, catchPhrase } = selectedCeleb;
      res.render("celebrities/celebrity-details", {
        _id,
        name,
        occupation,
        catchPhrase,
      });
    })
    .catch((err) =>
      console.log("Displaying the celebrity details failed, sorry.", err)
    );
});

// DELETE A CELEBRITY
router.post("/:id/delete", (req, res) => {
  celebrityModel
    .findByIdAndRemove(req.params.id)
    .then(() => res.redirect("/celebrities"))
    .catch((err) => console.log("Catched an Error", err));
});

// UPDATE A CELEBRITY
router.get("/:id/edit", (req, res) => {
  celebrityModel
    .findById(req.params.id)
    .then((selectedCeleb) => {
      const { _id, name, occupation, catchPhrase } = selectedCeleb;
      res.render("celebrities/edit-celebrity", {
        _id,
        name,
        occupation,
        catchPhrase,
      });
    })
    .catch((err) => console.log("Nope, not today", err));
});

router.post("/:id/edit", (req, res) => {
  console.log(req.body);
  const { name, occupation, catchPhrase } = req.body;
  celebrityModel
    .findByIdAndUpdate(req.params.id, { name, occupation, catchPhrase })
    .then(() => res.redirect(`/celebrities/${req.params.id}`))
    .catch((err) => console.log("NO UPDATE", err));
});

module.exports = router;
