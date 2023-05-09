const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model.js");
const Movie = require("../models/Movie.model.js");

router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities.create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;

  async function createCelebrityInDb() {
    try {
      let createdCelebrity = await Celebrity.create({
        name,
        occupation,
        catchPhrase,
      });

      res.redirect("/celebrities");
    } catch (error) {
      res.render("celebrities/new-celebrity")
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
        console.log("Retrieved Celebrities from DB:", allCelebritiesFromDb);
  
        // Render all the books from DB with hbs view
        res.render('celebrities/celebrities.hbs', {celebrities: allCelebritiesFromDb}); 
      } catch (error) {
        console.log(error);
      }
    }
    findAllCelebritiesFromDb();
  });

module.exports = router;
