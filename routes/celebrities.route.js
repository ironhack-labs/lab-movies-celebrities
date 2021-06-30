// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
// all your routes here


router.get("/celebrities", async (req, res) => {
    const allCelebrities = await Celebrity.find().sort({name: 1});
    res.render("celebrities/celebrities", { allCelebrities });
  });



  router.get("/celebrities/create", (req, res) => {
    res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", async (req, res) => {
    const { name, occupation, catchPhrase } = req.body;
    await Celebrity.create({
        name,
        occupation,
        catchPhrase,
    });
    res.redirect("/Celebrities");
  });
 
module.exports = router;