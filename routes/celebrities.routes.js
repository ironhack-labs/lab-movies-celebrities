// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model.js");

router.get("/celebrities/create", (req, res, next) => {
  Celebrity.find()
    .then((allCelebrities) => {
      res.render("celebrities/new-celebrity", { celebrities: allCelebrities });
    })
    .catch((error) => {
      console.log("Celebrity error: ", error);
      next(error);
    });
});

router.post("/celebrities/create", (req, res, next) => {
  // console.log("The form data: ", req.body);
  const { name, occupation, catchPhrase } = req.body;
  return Celebrity.create({ name, occupation, catchPhrase })
    .then((allCelebrities) => {
      //console.log("Response statusCode: ", res.statusCode);
      if (res.statusCode !== 200) {
        res.render("celebrities/new-celebrity", {
          celebrities: allCelebrities,
        });
      } else {
        res.redirect("/celebrities");
      }
    })
    .catch((error) => {
      console.log("Celebrity create error: ", error);
      next(error);
    });
});

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((allCelebrities) => {
      res.render("celebrities/celebrities", { celebrities: allCelebrities });
    })
    .catch((error) => {
      console.log("Celebrity error: ", error);
      next(error);
    });
});

router.get("/celebrities/:celebrityId", (req, res, next) => {
  const { celebrityId } = req.params;

  Celebrity.findById(celebrityId)
    .then((theCelebrity) =>
      res.render("celebrities/celebrities-details", { celebrity: theCelebrity })
    )
    .catch((error) => {
      console.log("Error while getting celebrities from DB: ", error);
      // call the middleware-error to display error page to the user
      next(error);
    });
});

router.get("/celebrities/:celebrityId/edit", (req, res, next) => {
  const { celebrityId } = req.params;

  Celebrity.findById(celebrityId)
    .then((celebrityToEdit) => {
      Celebrity.find().then((celebrities) => {
        res.render("celebrities/edit-celebrity", {
          celebrity: celebrityToEdit,
          celebrities,
        });
      });
    })
    .catch((error) => next(error));
});

router.post("/celebrities/:celebrityId/edit", (req, res, next) => {
  const { celebrityId } = req.params;
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.findByIdAndUpdate(
    celebrityId,
    { name, occupation, catchPhrase },
    { new: true }
  )
    .then((updatedCelebrity) =>
      res.redirect(`/celebrities/${updatedCelebrity.id}`)
    )
    .catch((error) => next(error));
});

router.post("/celebrities/:celebrityId/delete", (req, res, next) => {
  const { celebrityId } = req.params;
  Celebrity.findByIdAndDelete(celebrityId)
    .then((celebrity) => res.redirect("/celebrities"))
    .catch((error) => next(error));
});

// all your routes here

module.exports = router;
