const Celebrity = require("../models/Celebrity.model");
const router = require("express").Router();

router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then((celebrity) => {
      res.redirect("/celebrities");
    })
    .catch((error) => {
      console.log(error);
      res.render("celebrities/new-celebrity");
    });
});

router.get("/", (req, res) => {
  Celebrity.find()
    .then((allCelebrities) => {
      res.render("celebrities/celebrities", { allCelebrities });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/:id", (req, res) => {
  Celebrity.findById(req.params.id)
    .then((celebrity) => {
      res.render("celebrities/celebrity-detail", celebrity);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/:id/delete", (req, res) => {
  Celebrity.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/:id/edit", (req, res) => {
  Celebrity.findById(req.params.id)
    .then((celebrity) => {
      res.render("celebrities/edit-celebrity", celebrity);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/:id/edit", (req, res) => {
  const { id } = req.params;
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(id, {
    name,
    occupation,
    catchPhrase,
  })
    .then(() => {
      res.redirect(`/celebrities/${id}`);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
