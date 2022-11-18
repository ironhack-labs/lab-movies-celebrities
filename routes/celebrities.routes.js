// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model.js"); // <== add this line before your routes

// all your routes here

router.get("/celebrities", (req, res, next) => {
    return Celebrity.find()
      .then((allTheCelebritiesFromDB) => {
        res.render("celebrities/celebrities.hbs", { Celebrities: allTheCelebritiesFromDB });
      })
      .catch((error) => {
        console.log("Error while getting the books from the DB: ", error);
        // Call the error-middleware to display the error page to the user
        next(error);
      });
});

router.get("/celebrities/create", (req, res) => res.render("celebrities/celebrities.hbs"));



// post the celebrities 
router.post("/celebrities/create", (req, res, next) => {
    // console.log(req.body);
    const { name, occuptaion, catchPhrase } = req.body;
  
    Celebrity.create({ name, occuptaion, catchPhrase  })
      // .then(bookFromDB => console.log(`New book created: ${bookFromDB.title}.`))
      .then(() => res.redirect("/celebrities"))
      .catch((error) => next(error));
  });
  

module.exports = router;