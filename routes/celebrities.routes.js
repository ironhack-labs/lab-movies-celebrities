const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

// Creating new Celebrities Routes
router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity.hbs");
});

router.post("/create", (req, res) => {
  Celebrity.create(req.body)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch(() => {
      res.render("celebrities/new-celebrity.hbs");
    });
});

// Displaying a list of all celebrities
router.get("/", (req, res) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("celebrities/celebrities.hbs", { celebrities });
    })
    .catch((err) => console.log(err));
});

// Show details for celebrities
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Celebrity.findById(id)
    .then((movie) => {
      res.render(`celebrities/celebrity-details`, movie);
    })
    .catch((err) => console.log(err));
});

// Delete celebrities
router.post("/:id/delete", (req, res) => {
  const { id } = req.params;
  Celebrity.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((err) => console.log(err));
});

// Editing celebrity
router.get("/:id/edit", (req, res) => {
  const { id } = req.params;
  Celebrity.findById(id).then((celebrity) => {
    res.render("celebrities/edit-celebrity.hbs", celebrity);
  });
});

router.post("/:id", (req, res) => {
  const { id } = req.params;
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(
    id,
    { name, occupation, catchPhrase },
    { new: true }
  )
    .then(() => {
      res.redirect(`/celebrities/${id}`);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
