// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    // .populate('author')
    .then((celebritiesFromDB) => {
      const data = {
        celebritiesArr: celebritiesFromDB,
      };
      res.render("celebrities/celebrities", data);
    })
    .catch((error) => {
      console.log("Error getting list of celebrities from DB", error);
      next(error);
    });
});

router.get("/celebrities/create", (req, res, next) => {
  Celebrity.find()
    .then(() => {
    res.render('celebrities/new-celebrities')
    })
    .catch((error) => {
      console.log("Error getting celebrities from DB", error);
      next(error);
    });
});

router.post('/celebrities/create', (req, res, next) => {

    const celebrityName = req.body.name;
    const celebrityOccupation = req.body.occupation;
    const celebrityCatchPhrase = req.body.catchPhrase;

    const data = {
        name: celebrityName,
        occupation: celebrityOccupation,
        catchPhrase: celebrityCatchPhrase
    }

    Celebrity.create(data)
        .then( () => {
            res.redirect("/celebrities");
        })
        .catch( (error) => {
            res.render("celebrities/new-celebrities", {
            celebritiesArr: allCelebrities,
        });
            next(error);
        });

});

module.exports = router;
