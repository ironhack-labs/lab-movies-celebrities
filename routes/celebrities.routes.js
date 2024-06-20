const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  const newCelebrity = new Celebrity({ name, occupation, catchPhrase });

  newCelebrity
    .save()
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((error) => {
      res.render("celebrities/create", { error });
    });
});

router.get("/:id/edit", (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((celebrityFromDB) => {
      res.render("celebrities/edit-celebrity", { celebrity: celebrityFromDB });
    })
    .catch((error) => next(error));
});

router.post("/:id/edit", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(
    req.params.id,
    { name, occupation, catchPhrase },
    { new: true }
  )
    .then((updatedCelebrity) => {
      res.redirect(`/celebrities/${updatedCelebrity._id}`);
    })
    .catch((error) => next(error));
});

router.post("/:id/delete", (req, res, next) => {
  Celebrity.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((error) => next(error));
});

router.get("/", (req, res, next) => {
    Celebrity.find()
      .then((celebritiesFromDB) => {
        res.render("celebrities/celebrities", { celebrities: celebritiesFromDB });
      })
      .catch((error) => {
        console.log("Error while getting the celebrities from the DB: ", error);
      });
  });

router.get("/:id", (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((celebrityFromDB) => {
      res.render("celebrities/celebrity-details", {
        celebrity: celebrityFromDB,
      });
    })
    .catch((error) => next(error));
});


module.exports = router;
