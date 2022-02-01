// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrities = require("./celebrities.routes");

// all your routes here

// register new celebrity form
router.get("/celebrities/create", (req, res) => res.render("/celebrity/new-celebrity")
);

// POST to submit new celebrity
router.post("/celebrities/create", (req, res) => {
  const { celebrity } = req.body;
  Celebrity.findOne({ celebrity })
    .then((celebrityFromDB) => {
      if (!celebrityFromDB) {
        
        Celebrity.create({ celebrity })
        .then(() => res.redirect("/celebrities/create"));
      } else {
        res.render("/celebrities/new-celebrity", {
          message: "It seems your celebrity is already registered. ☀️",
        });
        return;
      }
    })
    .catch((err) => console.log(`Error while creating a new user: ${err}`));
});

// GET to display celebrities from db
router.get("/celebrities", (req, res) => {
  Celebrity.find() //
    .then((celebritiesFromDB) => res.render("/celebrities/celebrities", { celebrities: celebritiesFromDB }))
    .catch((err) =>
      console.log(`Error while getting celebrities from the DB: ${err}`)
    );
});

module.exports = router;
