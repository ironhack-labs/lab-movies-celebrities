const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");
const ObjectId = require("mongodb").ObjectId;
module.exports.createCelebrity = (req, res, next) => {
  res.render("celebrities/new-celebrity");
};

module.exports.doCreateCelebrity = (req, res, next) => {
  Celebrity.create(req.body)
    .then((celebrity) => {
      console.log(celebrity);
      res.redirect("/celebrities");
    })
    .catch((error) => next(error));
};

module.exports.getCelebrities = (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      console.log(celebrities);
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch((error) => next(error));
};
module.exports.celebrityDetails = (req, res, next) => {
  const { celebrityId } = req.params;
  Celebrity.findById(celebrityId)
    .then((celebrity) => {
      Movie.find({
        cast: {
          $in: [ObjectId(celebrityId)],
        },
      }).then((movies) => {
        res.render("celebrities/celebrity-details", { celebrity, movies });
      });
    })
    .catch((error) => next(error));
};
module.exports.deleteCelebrity = (req, res, next) => {
  const { celebrityId } = req.params;
  Celebrity.findByIdAndDelete(celebrityId)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((error) => next(error));
};
module.exports.editCelebrity = (req, res, next) => {
  const { celebrityId } = req.params;
  Celebrity.findById(celebrityId)
    .then((celebrity) => {
      res.render("celebrities/edit-celebrity", { celebrity });
    })
    .catch((error) => next(error));
};
module.exports.updateCelebrity = (req, res, next) => {
  const { celebrityId } = req.params;
  Celebrity.findByIdAndUpdate(celebrityId, req.body, { new: true })
    .then((updateCelebrity) => {
      res.redirect(`/celebrities/${updateCelebrity._id}`);
    })
    .catch((error) => next(error));
};
