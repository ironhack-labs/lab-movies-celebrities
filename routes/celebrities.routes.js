// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const CelebrityModel = require("../models/Celebrity.model");

//Find celebrities

router.get("/celebrities", (req, res, next) => {
  CelebrityModel.find()
    .then((celebrities) => {
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch((error) => {
      console.log("Error when finding celebrities");
      next(error);
    });
});

//Create and post celebrities

router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  CelebrityModel.create({ name, occupation, catchPhrase })
    .then((createdCelebrity) => {
      res.redirect("/celebrities");
    })
    .catch((err) => res.render("celebrities/new-celebrity"));
});

/* router.post("/celebrities/create", async (req, res, next) => {
    try {
      const { name, occupation, catchPhrase } = req.body;
      await Celebrity.create({ name, occupation, catchPhrase });
      res.redirect("/celebrities");
    } catch (err) {
      res.render("celebrities/new-celebrity");
    }
  }); */

router.get("/celebrities/:id", (req, res, next) => {
  const celebrityId = req.params.id;

  CelebrityModel.findById(celebrityId)
    .then((celebrities) => {
      res.render("celebrities/celebrity-details", { celebrity: celebrities });
    })
    .catch((err) => next(err));
});

// DELETE

router.get("/celebrities/:id/delete", (req, res, next) => {
  CelebrityModel.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((err) => next(err));
});

// EDIT

router.get("/celebrities/:id/edit", (req, res, next) => {
  const id = req.params.id;
  CelebrityModel.findById(id)
    .then((celebrities) => {
      res.render("celebrities/edit-celebrity", { celebrity: celebrities });
    })
    .catch((err) => next(err));
});

router.post("/celebrities/:id/edit", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  CelebrityModel.findByIdAndUpdate(req.params.id, {
    name,
    occupation,
    catchPhrase,
  })
    .then(() => {
      res.redirect(`/celebrities/${req.params.id}`);
    })
    .catch((err) => next(err));
});



module.exports = router;
