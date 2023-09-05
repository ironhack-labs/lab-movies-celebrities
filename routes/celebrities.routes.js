const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities/create", (req, res) => {
    Celebrity.find()
      .then((celebrities) => {
        res.render("celebrities/new-celebrity", { celebrities });
      })
      .catch((err) =>
        console.log(`Err while displaying page: ${err}`)
      );
  });



  router.post("/celebrities/create", (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;

    Celebrity.create(req.body) // or Post.create({ name, occupation, catchPhrase })
      .then(() => {
        res.redirect("/celebrities")});
      })
      .catch((err) => {
       res.render("celebrities/new-celebrity", { error: 'Celebrity.'} )
      });
  

router.get("/celebrities", (req, res, next) => {
    
    Celebrity.find()
          .then((celebsFromDb ) => {
            console.log(celebsFromDb);
            res.render("/celebrities/celebrities", { celebs: celebsFromDb });
          })
          .catch((err) => {
           console.log(err);
          });
      });


module.exports = router;

