// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

//Require The Model
const Celebrity = require("../models/Celebrity.model.js");

// Create the following GET route: /celebrities/create
router.get("/celebrities/create", (req, res) => {
    res.render("celebrities/new-celebrity.hbs");
  });
  
  router.post("/celebrities/create", (req, res) => {
    const { name, occupation, catchPhrase } = req.body;
    async function createCelebrity() {
      try {
        let createdCelebrity = await Celebrity.create({
          name,
          occupation,
          catchPhrase,
        });
        res.redirect("/celebrities");
      } catch (error) {
        console.log(error);
      }
    }
  
    createCelebrity();
  });

  //Create the /celebrities GET route to display ALL THE CELEBRITIES
router.get("/celebrities", (req, res) => {
  async function findAllCelebrities() {
    try {
      let allCelebrities = await Celebrity.find();
      res.render("celebrities/celebrities.hbs", { celebrities: allCelebrities });
    } catch (error) {
      console.log(error);
    }
  }
  findAllCelebrities();
});

module.exports = router;