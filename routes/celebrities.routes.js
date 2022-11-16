// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const Celebrity = require('../models/Celebrity.model');
const router = require("express").Router();

/* GET home page */
router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  // console.log(req.body);
  const { name, ocupation, catchPhrase } = req.body;

  Celebrity.create({ name, ocupation, catchPhrase })
    // .then(bookFromDB => console.log(`New book created: ${bookFromDB.title}.`))
    .then(() => res.redirect("/celebrities/create"))
    .catch((error) => res.render("celebrities/new-celebrity"));
});
  
router.get("/celebrities", (req, res, next) => {
  return Celebrity.find()
    .then((allTheCelebritiessFromDB) => {
      res.render("celebrities/celebrities.hbs", { celebrities: allTheCelebritiessFromDB });
    })
    .catch((error) => {
console.log(error)    });
});


// Get celebrity details
router.get("/celebrities/:id", (req, res) => {
  const id = req.params.id

  Celebrity.findById(id)
  .then(celebrity => {
      res.render("celebrities/celebrity-details", { celebrity })
  })
  .catch(err => {
      console.log(err)
  })
})

// Delete celebrity
router.post("/celebrities/:id/delete", (req, res) => {
  const id = req.params.id

  Celebrity.findByIdAndRemove(id)
  .then(deletedCelebrity => {
      res.redirect("/celebrities")
  })
  .catch(err => {
      console.log(err)
  })
})

// Edit celebrity
router.get("/celebrities/:id/edit", (req, res) => {
  const id = req.params.id

  Celebrity.findById(id)
  .then(celebrity => {
      res.render("celebrities/edit-celebrity", { celebrity })
  })
  .catch(err => {
      console.log(err)
  })
})

router.post("/celebrities/:id/edit", (req, res) => {
  const id = req.params.id
  const { name, occupation, catchPhrase } = req.body

  const celebrity = {
      name,
      occupation,
      catchPhrase
  }

  Celebrity.findByIdAndUpdate(id, celebrity)
  .then(createdCelebrity => {
      res.redirect(`/celebrities/${id}`)
  })
  .catch(err => {
      console.log(err)
  })
})

module.exports = router;




