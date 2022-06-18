const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movies = require("../models/Movies.model");
/* 
/celebrities/create	GET	Show a form to create a celebrity
/celebrities/create	POST	Send the data from the form to this route to create the celebrity and save it to the database
 */

//Create celebrities
router.get("/create", (req, res, next) => {
  //recuerda que como estás ya en celebrities route, ya no necesitas el prefijo celebrities aquí
  res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res, next) => {
  const celebrity = req.body;
  Celebrity.create(celebrity)
    .then((celebrity) => {
      console.log("create success", celebrity);
      res.redirect("/celebrities/celebrities");
    })
    .catch((err) => {
      console.log("error creating celebrity", err);
      next();
    });
});

//Read celebrities
router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .populate("moviePlayed")
    .then((celebrities) => {
      console.log("found these celebrities", celebrities);
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch((error) => {
      console.log("error reading celebrities", error);
      next();
    });
});

//celebrities detail
router.get("/celebrities/:id", (req, res, next) => {
  const { id } = req.params;
  Celebrity.findById(id)
    .populate("moviePlayed")
    .then((data) => {
      console.log("info de celebrity", data);
      res.render("celebrities/celebrity-details", data);
    })
    .catch((err) => {
      console.log("error findingcelebrities", err);
      next();
    });
});

//delete celebrities
router.get("/delete/:id", (req, res, next) => {
  Celebrity.findByIdAndDelete(req.params.id)
    .then(() => {
      console.log("celebrity deleted");
      res.render("index");
    })
    .catch((err) => {
      console.log("error deleting", err);
      next();
    });
});

//Edit celebrities
//get route

router.get("/edit/:id", (req, res, next) => {
  const { id } = req.params;

  Celebrity.findById(id)
    .populate("moviePlayed")
    .then((celebrity) => {
      console.log("details of the celebrity", celebrity);

      res.render("celebrities/edit-celebrity", celebrity);
      /*       Celebrity.find()
        .then((celebrities) => {
          //console.log("las celebridades: ", celebrities);
          res.render("movies/edit-movie", {
            data: { movie: movie, celebrities: celebrities },
          });
        })
        .catch((err) => {
          console.log("error editing movie", err);
          next();
        }); */
    })
    .catch((err) => {
      console.log("error finding celebrity", err);
      next();
    });
});

//post route

router.post("/celebrity/edit/:id", (req, res, next) => {
  const { id } = req.params;
  const { name, occupation, catchPhrase, moviePlayed } = req.body;

  Celebrity.findByIdAndUpdate(
    id,
    { name, occupation, catchPhrase },
    { new: true }
  ).then((updatedCelebrity) => {
    updatedCelebrity.moviePlayed.push(moviePlayed);
    updatedCelebrity.save();

    Movies.findById(moviePlayed)
      .then((movie) => {
        movie._cast.push(updatedCelebrity._id);
        movie.save();
        console.log("movie, :", movie);
        res.redirect("/celebrities/celebrities");
      })
      .catch((err) => {
        console.log("error updating movie", err);
        next();
      });
  });
});

module.exports = router;
