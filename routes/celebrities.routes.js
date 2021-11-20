//make a reference between function Router from express to our local variable router

//require celebrity model
const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

//insert handles here

//route to celebrities.hbs
router.get("/", (req, res, next) => {
  res.render("celebrities/celebrities", {});
});

//route to new-celebrities.hbs
router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});
//route data from form of new-celebrity
router.post("/create", async (req, res, next) => {
  try {
    const newCeleb = req.body;
    await Celebrity.create(newCeleb);
  } catch (error) {
    console.error(`Following error occured by post new celebrity: ${error}`);
    res.redirect("/create");
  }

  //why do we use only /celebrities instead of /celebrities/celebrities
  //is it because of level of folder or path in browser
  res.redirect("/celebrities");
});

//export

module.exports = router;
