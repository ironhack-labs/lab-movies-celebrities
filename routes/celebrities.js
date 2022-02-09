// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrities = require("../models/Celebrity.model");

router.get("/", (req, res, next) => {
  Celebrities.find()
    //.populate("author")
    .then( celebritiesFromDB => {
      res.render("celebrities/celebrities-list", {celebrities: celebritiesFromDB});
    })
    .catch(err => {
      console.log('Error getting celebrities from DB...', err);
    })
});

router.get("/create", (req, res, next) => {
  Celebrities.find()
    .then(celebrities => {
      res.render("celebrities/celebrity-new", {celebritiesArr: celebrities});
    })
    .catch(err => {
      console.log('Error getting celebrities from DB...', err);
    })
});

router.post('/create', (req, res, next) => {
console.log("post celebrity");
  const celebrityDetails = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchphrase,
  }

  Celebrities.create(celebrityDetails)
    .then( celebrity => {
      res.redirect("/celebrities");
    })
    .catch( err => {
      console.log('Error creating new celebrity...', err);
      res.redirect("celebrities/celebrity-new");
    })
})

router.get("/:celebrityId/delete", (req, res, next) => {
  console.log("delete");
  Celebrities.findByIdAndDelete(req.params.celebrityId)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch(err => {
      console.log("Error deleting celebrity...", err);
    });

});

router.get("/:celebrityId", (req, res, next) => {
  Celebrities.findById(req.params.celebrityId)
    //.populate("author")
    .then( celebrity => {
      res.render("celebrities/celebrity-details", celebrity);
    })
    .catch();
});


router.get("/:celebrityId/edit", (req, res, next) => {
  Celebrities.findById(req.params.celebrityId)
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

  Celebrities.findByIdAndUpdate(celebrityId, newDetails)
    .then( () => {
      res.redirect(`/celebrities/${celebrityId}`);
    })
    .catch( err => {
      console.log("Error updating celebrity...", err);
    });
});




module.exports = router;