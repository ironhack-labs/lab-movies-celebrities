const express = require("express");
const router = express.Router();

const Celebrity = require("../models/Celebrity.model");

/* ⬇ "/" porque estamos en la misma ruta (¡¡no necesariamente /home!!) */

router.get("/", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch((e) => {
      console.log("Oops", err);
    });
});

router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res, next) => {
  Celebrity.create(req.body)
    .then((celebrity) => {
      console.log(`New celebrity created: ${celebrity}`, req.body);
      res.redirect(
        "/celebrities"
      ); /* also --> res.status(302).redirect("/")) */
    })
    .catch((e) => {
      res.render("/celebrities/new-celebrity");
    });
});

/*   las rutas parametrizables at the end!! */

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Celebrity.findById(id)
    .then((celebrity) => {
      res.render("celebrities/celebrity-details", { celebrity });
    })
    .catch((e) => {
      console.error(e);
    });
});

router.post("/:id/delete", (req, res, next) => {
  const idToDelete = req.params.id;
  Celebrity.findByIdAndDelete(idToDelete).then(() => {
    res.redirect("/celebrities").catch((e) => {
      console.error(e);
    });
  });
});

module.exports = router;
