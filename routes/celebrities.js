const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
// all your routes here

router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then((celebrity) => {
      res.redirect("/celebrities");
    })
    .catch(() => res.render("celebrities/new-celebrity"));
});

router.get("/celebrities", (req, res) => {
  Celebrity.find().then((celebs) => {
    console.log(celebs);
    res.render("celebrities/celebrities", { celebs: celebs });
  });
});

router.get("/celebrity/:id", (req, res) => {
  const { id } = req.params;
  Celebrity.findById(id).then((celeb) => {
    res.render("celebrities/celebrity-details", { celeb: celeb });
  });
});

router.post("/celebrities/:id/delete", (req, res) => {
  const { id } = req.params;

  Celebrity.findByIdAndRemove(id).then(() => res.redirect("/celebrities"));
});

router.get("/celebrity/:id/edit", (req, res) => {
  const { id } = req.params;

  Celebrity.findById(id).then((celeb) => {
    res.render("celebrities/edit-celebrity", { celeb: celeb });
  });
});

router.post("/celebrities/:id", (req, res) => {
  const { id } = req.params;

  Celebrity.findByIdAndUpdate(id, req.body).then((updatedCeleb) => {
    res.redirect("/celebrity/" + id);
  });
});
module.exports = router;
