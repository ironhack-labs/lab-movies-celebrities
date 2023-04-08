const CelebModel = require("../models/Celebrity.model");

const router = require("express").Router();

router.get("/create", (req, res) => {
  res.render("celebs/new-celeb");
});

router.post("/create", async (req, res) => {
    try {
        const newCelebCreated = await CelebModel.create(req.body);
        res.redirect('/celebs');
    } catch {
        res.redirect('/create');
    }
   

  });

module.exports = router;
