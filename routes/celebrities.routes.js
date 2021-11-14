const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/", (req, res) => {
  Celebrity.find().then((allCelebrities) => {
    res.render("celebrities", { allCelebrities });
  });
});

router.get("/create", (req, res, next) => {
  res.render("new-celebrity");
});
router.post("/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then((newCelebritie) => {
      res.redirect("/celebrity");
    })
    .catch((err) => {
      console.log(err);
      res.render("new-celebrity");
    });
});

router.get("/:id", (req, res) => {
  const celebrityId = req.params.id;
  Celebrity.findById(celebrityId)
    .then((celebrityDetail) => {
      res.render("celebrity-detail", { celebrityDetail });
    })
    .catch((err) => console.log(err));
});

router.post("/:id/delete", (req, res) => {
  Celebrity.findByIdAndRemove(req.params.id)
    .then(res.redirect("/celebrity"))
    .catch((err) => console.log(err));
});

router.get("/:id/edit", (req, res) => {
  const celebrityId = req.params.id;
  Celebrity.findById(celebrityId)
    .then((findedCelebrity) => {
      res.render("edit-celebrity", { findedCelebrity });
    })
    .catch((err) => console.log(err));
});

router.post("/:id/edit", (req, res) => {
  const celebrityRoute = "/celebrity/" + req.params.id;
  Celebrity.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(res.redirect(celebrityRoute))
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
