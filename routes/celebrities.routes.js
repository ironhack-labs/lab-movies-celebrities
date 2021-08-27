// starter code
const router = require("express").Router();
const CelebrityModel = require("../models/Celebrity.model.js");

// all routes
router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res, next) => {
  console.log(req.body);
  const { name, occupation, catchPhrase } = req.body;
  CelebrityModel.create({ name, occupation, catchPhrase })
    .then((celebrity) => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      console.log("Error while creating new celebrity:", err);
      res.render("celebrities/new-celebrity");
    });
});

router.get("/", (req, res, next) => {
  CelebrityModel.find()
    .then((celebrities) => {
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch((err) =>
      console.log("Error while searching for all celebrities:", err)
    );
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  CelebrityModel.findById(id)
    .then((celebrity) => {
      res.render("celebrities/celebrity-details", { celebrity });
    })
    .catch((err) => {
      console.log("error while accessing a celebrity:", err);
    });
});

router.post("/:id/delete", (req, res, next) => {
  const { id } = req.params;
  CelebrityModel.findByIdAndDelete(id)
    .then((celebrity) => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      console.log("error while deleting a celebrity:", err);
    });
});

router.get("/:id/edit", (req, res, next) => {
  const { id } = req.params;
  CelebrityModel.findById(id)
    .then((celebrity) => {
      res.render("celebrities/edit-celebrities", { celebrity });
    })
    .catch((err) => {
      console.log("error while trying to edit a celebrity:", err);
    });
});

router.post("/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { name, occupation, catchPhrase } = req.body;
  CelebrityModel.findByIdAndUpdate(
    id,
    { name, occupation, catchPhrase },
    { new: true }
  )
    .then((celebrity) => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      console.log("error while trying to update a celebrity:", err);
    });
});

// exporting routes file
module.exports = router;
