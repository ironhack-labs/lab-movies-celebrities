// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/celebrities/create", (req, res) => res.render("celebrities/new-celebrity")); // router.get("/books/create", is the URL, what the user sees.

router.post("/celebrities/create", async (req, res, next) => {
  try {
    //extract info from req.body

    const { name, occupation, catchPhrase } = req.body; // use the same names

    //create the book in the db
    await Celebrity.create({ name, occupation, catchPhrase  }); // order os properties doesn't matter - more descriptive this way.

    //await Book.create(req.body) - Shorter version

    //redirect to the list again
    res.redirect("/celebrities");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/celebrities", async (req, res, next) => {
    //31 - 32
  
    try {
      // Book.find() without any arguments retrieves an array with all the books from the db
      let celebrities = await Celebrity.find(); // find is a method, always returns an array
  
      //render the view with the information
      res.render("celebrities/celebrities", { celebrities }); // because it's an array, get the books and send to the frontend
    } catch (error) {
      next(error);
    }
  });


module.exports = router;