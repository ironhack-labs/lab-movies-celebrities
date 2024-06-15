const { Router } = require("express");

const router = new Router();

const Celebrity = require("../models/Celebrity.model");

router.get("/", async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find();
    res.render("celebrities/celebrities", { celebrities });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/create", (req, res, next) => {
    res.render("celebrities/new-celebrity");
  });
  
  router.post("/create", async (req, res, next) => {
    try {
      await Celebrity.create(req.body);
      res.redirect("/celebrities");
    } catch (error) {
      console.log(error);
      res.redirect("/celebrities/create");
    }
  });

router.get("/:id", async (req, res, next) => {
    try {
      const celebrity = await Celebrity.findById(req.params.id);
      res.render("celebrities/celebrity-details", celebrity);
    } catch (error) {
      console.log(error);
      res.redirect("/celebrities");
    }
  });



router.get("/:id/edit", async (req, res, next) => {
    try {
      const celebrity = await Celebrity.findById(req.params.id);
      res.render("celebrities/edit-celebrity", celebrity);
    } catch (error) {
      console.log(error);
      res.redirect("/celebrities");
    }
  });
  
  router.post("/:id/edit", async (req, res, next) => {
    try {
      await Celebrity.findByIdAndUpdate(req.params.id, req.body);
      res.redirect(`/celebrities/${req.params.id}`);
    } catch (error) {
      console.log(error);
      res.redirect("/celebrities");
    }
    
  });
  
  router.post("/:id/delete", async (req, res, next) => {
    try {
      await Celebrity.findByIdAndDelete(req.params.id);
    } catch (error) {
      console.log(error);
    }
    res.redirect("/celebrities");
  });

module.exports = router;
