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

router.get("/celebs", async (req,res) => {
    try {
        const allCelebs = await CelebModel.find();
        res.render("celebs/celebs", {allCelebs});

    } catch {
        res.send ("Oops, an error, go back");
    }
    
})

module.exports = router;
