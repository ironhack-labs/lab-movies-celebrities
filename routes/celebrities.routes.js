const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");
const isLoggedIn = require("../utils/route-guard");

router.get("/", (req, res, next) => {
  Celebrity.find()
  .then((celebrities)=>{
    res.render("celebrities/celebrities", {celebrities});
  })
  .catch((err)=>{
    next(err);
  })
});

router.get("/new", isLoggedIn, (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", isLoggedIn, (req, res, next)=>{
  const {name, occupation, catchPhrase, image} = req.body;

  Celebrity.create({name, occupation, catchPhrase, image})
  .then((result)=>{
    console.log ("New celebrity was added", result);
    res.redirect ("/celebrities")
  })
  .catch((err)=>{
    res.redirect("/celebrities/new");
    // next(err);
  })
});

router.post("/delete/:id",  isLoggedIn, (req, res, next)=>{
  Celebrity.findByIdAndDelete(req.params.id)
  .then(()=>{
    res.redirect("/celebrities");
  })
  .catch((err)=>{
    next(err);
  })
});

router.get("/edit/:id", isLoggedIn, (req, res, next) => {
  Celebrity.findById(req.params.id)
  .then((celebrity)=>{
    res.render("celebrities/edit-celebrity", celebrity)
  })
  .catch((err)=>{
    next(err);
  })
});

router.post("/update/:id", isLoggedIn, (req, res, next)=>{
  const {name, occupation, catchPhrase, image} = req.body;
  
  Celebrity.findByIdAndUpdate(req.params.id, {name, occupation, catchPhrase, image})
  .then(()=>{
    res.redirect("/celebrities/" + req.params.id);
  })
  .catch((err)=>{
    next(err);
  })
});

router.get("/:id", isLoggedIn, async (req, res, next) => {
  try{
    const celebrity = await Celebrity.findById(req.params.id);
    const movies = await Movie.find({celebrity: req.params.id});
      res.render("celebrities/celebrity-details", {celebrity, movies});
  } catch (err){
    next(err);
  }
});


module.exports = router;