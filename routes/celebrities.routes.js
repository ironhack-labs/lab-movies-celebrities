const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* SHOW CELEBRITIES */

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch((err) => next(err));
});

/* ADD CELEBRITIES */
router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.redirect("/celebrities"))
    .catch(() => res.render("celebrities/new-celebrity"));
});

/* DETAILS CELEBRITY */

router.get("/celebrities/:id", (req, res, next) => {
  const { id } = req.params;

  Celebrity.findById(id)
    .then((celebrity) => {
      res.render("celebrities/celebrity-details", { celebrity });
    })
    .catch((err) => next(err));
});

/* EDIT CELEBRITY */
router.get("/celebrities/:id/edit", (req, res, next) => {
  const { id } = req.params;
  Celebrity.findById(id)
    .then((celebrity) => {
      res.render("celebrities/edit-celebrity", { celebrity });
    })
    .catch((err) => next(err));
});

router.post("/celebrities/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase })
    .then(() => {
      res.redirect(`/celebrities/${id}`);
    })
    .catch((err) => next(err));
});

/* DELETE CELEBRITY  */
router.post("/celebrities/:id/delete", (req, res, next) => {
  const { id } = req.params;

  Celebrity.findByIdAndRemove(id)
    .then(() => res.redirect("/celebrities"))
    .catch((err) => next(err));
});

/* EXPORTS */
module.exports = router;
