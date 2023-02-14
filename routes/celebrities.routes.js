// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
const Celebrities = require("../models/Celebrity.model");

//now, we need to create the celebrities:
router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

//now, we have to send this info to the front-end
router.post("/celebrities/create", async (req, res, next) => {
  try {
    const { name, occupation, catchPhrase } = req.body;

    await Celebrities.create({ name, occupation, catchPhrase });

    res.redirect("celebrities/create");

  } catch (error) {
    console.log(error);
    next(error);
  }
});


    router.get("/celebrities", async (req, res, next) => {
        try {
          let celebrities = await Celebrities.find();
      
          res.render("celebrities/celebrities", { celebrities }); //-> we send it to the destination /celebrities and render the 
        } catch (error) {
          console.log(error);
          next(error);
        }
      });



module.exports = router;
