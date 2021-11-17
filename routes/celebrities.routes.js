// const express = require("express");
// const router = express.Router();

const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");



router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});


router.post("/celebrities/create", async (req, res, next) => {
    try {
        await Celebrity.create(req.body);
        res.redirect("/celebrities");
      } catch (err) {
          res.render("/celebrities/create")
        console.log("err", err);
      }
});


router.get("/celebrities",async (req,res,next) =>{
    try {
        const celebrities = await Celebrity.find({});
        res.render("celebrities/celebrities", { celebrities });
      } catch (err) {
        console.log("err", err);
      }

});

module.exports = router;
