const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");
const isLoggedIn = require("../utils/route-guard");
const isBanned = require("../utils/banned-user");
const isTempPassword = require("../utils/temp-password");

router.get("/", isTempPassword, (req, res, next) => {
  Celebrity.find()
  .then((celebrities)=>{
    res.render("celebrities/celebrities", {celebrities});
  })
  .catch((err)=>{
    next(err);
  })
});

router.get("/new", isLoggedIn, isBanned, isTempPassword, (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", isLoggedIn, isBanned, isTempPassword, (req, res, next)=>{
  const {name, occupation, catchPhrase, image} = req.body;

  Celebrity.create({name, occupation, catchPhrase, image})
  .then((result)=>{
    console.log ("New celebrity was added", result);
    req.flash("successMessage", `You successfully added ${result.name}.`);
    res.redirect ("/celebrities")
  })
  .catch((err)=>{
    req.flash("errorMessage", "Something went wrong, " + err);
    res.redirect("/celebrities/new");
    // next(err);
  })
});

router.post("/delete/:id",  isLoggedIn, isBanned, (req, res, next)=>{
  Celebrity.findByIdAndDelete(req.params.id)
  .then(()=>{
    req.flash("successMessage", `Your deletion was successful.`);
    res.redirect("/celebrities");
  })
  .catch((err)=>{
    next(err);
  })
});

router.get("/edit/:id", isLoggedIn, isBanned, isTempPassword, (req, res, next) => {
  Celebrity.findById(req.params.id)
  .then((celebrity)=>{
    res.render("celebrities/edit-celebrity", celebrity)
  })
  .catch((err)=>{
    next(err);
  })
});

router.post("/update/:id", isLoggedIn, isBanned, isTempPassword, (req, res, next)=>{
  const {name, occupation, catchPhrase, image} = req.body;
  
  Celebrity.findByIdAndUpdate(req.params.id, {name, occupation, catchPhrase, image})
  .then((celebrity)=>{
    req.flash("successMessage", `You successfully updated ${celebrity.name}.`);
    res.redirect("/celebrities/" + req.params.id);
  })
  .catch((err)=>{
    next(err);
  })
});

router.get("/:id", isLoggedIn, isBanned, isTempPassword, async (req, res, next) => {
  try{
    const celebrity = await Celebrity.findById(req.params.id).populate("movies");
      res.render("celebrities/celebrity-details", {celebrity});
  } catch (err){
    next(err);
  }
});


module.exports = router;