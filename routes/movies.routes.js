const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

/* GET home page */
router.get("/", (req, res, next) => {
  Movie.find()
    .then((results) => {
      res.render("movies/movies", { movies: results });
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

router.get("/create", (req, res, next) => {
  Celebrity.find()
    .then((results) => {
      res.render("movies/new-movie", { celebrities: results });
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

router.post("/create", (req, res, next) => {
  console.log(req.body);
  Movie.create(req.body)
    .then((results) => {
      console.log(results);
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

router.get("/:id", (req, res, next) => {
  console.log(req.params.id);
  Movie.findById(req.params.id)
    .populate("cast")
    .then((results) => {
      console.log("DETAILS ID", results);
      res.render("movies/movie-details", results);
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

router.post("/:id/delete", (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id)
    .then((results) => {
      console.log(results);
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

function findCeleb([...arr1], [...arr2]) {
  arr1.forEach((element, i) => {
    arr2.forEach((element2) => {
      if (element._id.equals(element2._id)) {
        arr1[i].status = "checked";
      }
    });
  });
  return arr1;
}

router.get("/:id/edit", (req, res, next) => {
  Celebrity.find()
    .then((results) => {
      Movie.findById(req.params.id)
        .populate("cast")
        .then((movie) => {
          newResult = findCeleb(results, movie.cast);
          console.log("NEW", newResult);
          res.render("movies/edit-movie", {
            movie: movie,
            celebrities: newResult,
          });
        })
        .catch((err) => {
          console.log("Something went wrong", err);
        });
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

router.post("/:id/edit", (req, res, next) => {
  console.log("ID", req.body);
  Movie.findByIdAndUpdate(req.params.id, req.body)
    .populate("cast")
    .then((results) => {
      console.log("DETAILS POST", results);
      res.redirect(`/movies/${results._id}`);
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

module.exports = router;
