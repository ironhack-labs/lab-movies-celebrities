// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model.js")

// all your routes here

//GET route: /celebrities/create
//render the celebrities/new-celebrity
router.get("/celebrities/create", (req, res) => {
    res.render("celebrities/new-celebrity.hbs");
  });


///celebrities/create POST route
router.post("/celebrities/create", async (req, res) => {
    try {
      //Object destructuring with req.body
      // There's always a match between an inpiut's name and a req.body properties name
      const { name, occupation, catchPhrase } = req.body;
  
      await Celebrity.create({ name, occupation, catchPhrase  });
      res.redirect("/celebrities");
  
      console.log(name);
      console.log(occupation);

    } catch (error) {
      console.log(error);
    }
  });




  // Display a list of all the celebrities in the DB
  // GET 
router.get("/celebrities", async (req, res) => {
    try {
      // get all celebrities from our Database via .find() method
      let allCelebsFromDb = await Celebrity.find();
  
      res.render("celebrities/celebrities", { celebrities: allCelebsFromDb });
    } catch (error) {
      console.log("Error while getting celebrities", error);
    }
  });



module.exports = router;