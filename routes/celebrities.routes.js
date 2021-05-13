const express = require("express");
const CelebrityModel = require("../../model/celebrity.model");
const router = express.Router();

/* GET Celebrities page - READ*/
router.get("/", (req, res, next) => {
  CelebrityModel.find()
  .then ((dbResult) => {
    res.render("celebrities/celebrities", { celebrities :  dbResult })
  })
  .catch(next)
});


/* GET Celebrities Route / CREATE a new celebrity. */
router.get("/new", (req, res) => {
  res.render("celebrities/new-celebrity.hbs");
});


/* POST - Celebrities Route / CREATE */
router.post("/create", (req, res, next) => {
  CelebrityModel.create(req.body)
    .then(() => {
      res.redirect("/celebrities")
    })
    .catch(next)
});

/*GET - Celebrity ID */
router.get("/celebrity-details/:id", (req, res, next) => {
  CelebrityModel.findById(req.params.id)
  .then ((dbResult) => {
    res.render("celebrities/celebrity-details", {celebrity : dbResult});
  })
  .catch(next)
});

/*GET DELETE */ 
router.get("/delete/:id", (req, res, next) => {
  CelebrityModel.findByIDAndRemove(req.params.id)
  .then(() => {
    res.redirect("/celebrities")
  })
  .catch(next)
});

module.exports = router;
