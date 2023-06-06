// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

// this route will render "new-celebrity" view when the user visits "/celebrities/create".
router.get("/create", (req, res) => {
    res.render("celebrities/new-celebrity");
  });

// this route creates new instance of "celebrity" model using data received from req.body
router.post("/create", (req, res) => {
    const { name, occupation, catchPhrase } = req.body;
  
    const newCelebrity = new Celebrity({
      name,
      occupation,
      catchPhrase
    });
  
    newCelebrity.save()
      .then(() => {
        res.redirect("/celebrities");
      })
      .catch((err) => {
        console.log(err);
        res.render("celebrities/new-celebrity");
      });
  });
  
  // this route retrieves all celebrities from the database using find(), it renders celebrities view and passes array of celebrites
  router.get("/", (req, res) => {
    Celebrity.find()
      .then((celebrities) => {
        res.render("celebrities/celebrities", { celebrities });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  

module.exports = router;