const express = require("express"); //defined express seperately
const router = express.Router();

const celebrityModel = require("../models/Celebrity.model");

router.get("/new-celebrity", (req, res) => {
  try {
    res.render("celebrities/new-celebrity");
    //res.send("newpage with new celebrities")
  } catch (err) {
    console.log("Error rendering new celebrity", err);
  }
});

router.post("/new-celebrity", async (req, res) => {
  try {
    await celebrityModel.create(req.body);
    console.log("celebrity created ");
    res.redirect("/celebrity/celebrities");
  } catch (err) {
    res.redirect("localhost:3000");
  }
  //res.render('/celebrities/new-celebrity')
});

router.get("/celebrities", async (req, res, next) => {
  try {
    const celebrities = await celebrityModel.find();
    res.render("celebrities/celebrities", { celebrities: celebrities });
  } catch (err) {
    console.log("Error getting celebrity", err);
  }
});

module.exports = router;
