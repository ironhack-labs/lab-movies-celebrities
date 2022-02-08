// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrities = require("../models/Celebrities.model");

router.get("/", (req, res, next) => {
  Book.find()
    .populate("author")
    .then( celebritiesFromDB => {
      res.render("celebrities/celebrities-list", {celebrities: celebritiesFromDB});
    })
    .catch(err => {
      console.log('Error getting celebrities from DB...', err);
    })
});


router.get("/create", (req, res, next) => {
  Author.find()
    .then(celebrities => {
      res.render("celebrities/celebrities-create", {celebritiesArr: celebrities});
    })
    .catch(err => {
      console.log('Error getting celebrities from DB...', err);
    })
});


router.post('/create', (req, res, next) => {

  const celebrityDetails = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    rating: req.body.rating,
  }

  Book.create(bookDetails)
    .then( book => {
      res.redirect("/celebrities");
    })
    .catch( err => {
      console.log('Error creating new book...', err);
    })
})


router.get("/:celebrityId", (req, res, next) => {
  Book.findById(req.params.celebrityId)
    .populate("author")
    .then( celebrity => {
      res.render("celebrities/celebrity-details", celebrity);
    })
    .catch();
});


router.get("/:celebrityId/edit", (req, res, next) => {
  Book.findById(req.params.celebrityId)
    .then( (celebrityDetails) => {
      res.render("celebrities/celebrity-edit", celebrityDetails);
    })
    .catch( err => {
      console.log("Error getting celebrity details from DB...", err);
    });
});

router.post("/:celebrityId/edit", (req, res, next) => {
  const bookId = req.params.bookId;

  const newDetails = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    rating: req.body.rating,
  }

  Book.findByIdAndUpdate(bookId, newDetails)
    .then( () => {
      res.redirect(`/celebrities/${bookId}`);
    })
    .catch( err => {
      console.log("Error updating celebrity...", err);
    });
});


router.post("/:celebrityId/delete", (req, res, next) => {
  Book.findByIdAndDelete(req.params.celebrityId)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch(err => {
      console.log("Error deleting celebrity...", err);
    });

});

module.exports = router;