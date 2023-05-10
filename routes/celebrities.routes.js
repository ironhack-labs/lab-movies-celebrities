// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;

  async function createCelebrityInDb() {
    try {
      let createCelebrity = await Celebrity.create({
        name,
        occupation,
        catchPhrase,
      });
      //console.log(`New Book Created: ${createBook.title}`);
      res.redirect("/celebrities");
    } catch (error) {
      res.render("celebrities/new-celebrity.hbs");
    }
  }
  createCelebrityInDb();
});

router.get("/celebrities", (req, res) => {
  async function findAllCelebritiesFromDb() {
    try {
      // Find all the books inside the collection
      let allCelebritiesFromDb = await Celebrity.find();
      // Feedback regarding to found books
      //console.log("Retrieved Celebrities from DB:", allCelebritiesFromDb);

      // Render all the books from DB with hbs view
      res.render("celebrities/celebrities.hbs", {
        celebrities: allCelebritiesFromDb,
      });
    } catch (error) {
      console.log(error);
    }
  }
  findAllCelebritiesFromDb();
});



module.exports = router;
