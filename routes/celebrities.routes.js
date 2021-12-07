const router = require('express').Router();
const Celebrity = require('../models/Celebrity.model');

// Create
router.get('/celebrities/create', (req, res, next) => res.render('celebrities/new-celebrity'));

router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;

    Celebrity.create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => {
            console.log('Erro while creating a new celebrity document: ', err);
            res.redirect('/celebrities/create');
        });
});

// Read
router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
        .then(celebritiesFromDB => res.render('celebrities/celebrities', { celebrities: celebritiesFromDB }))
        .catch(err => next(err));
});

// Read
router.get("/celebrities/:celebritiyId", (req, res, next) => {
  const { celebritiyId } = req.params;

  Celebrity.findById(celebritiyId)
    .then((theCelebs) => res.render("celebrities/celebrity-details", { celebrity: theCelebs }))
    .catch((err) => next(err));
});

// Delete
router.post("/celebrities/:celebrityId/delete", (req, res, next) => {
  const { celebrityId } = req.params;

  Celebrity.findByIdAndDelete(celebrityId)
    .then(() => res.redirect("/celebrities"))
    .catch((err) => next(err));
});

// Update
router.get("/celebrities/:celebrityId/edit", (req, res, next) => {
  const { celebrityId } = req.params;

  Celebrity.findById(celebrityId)
    .then(theCelebrityToEdit => {
        res.render('celebrities/edit-celebrity', { celebrity: theCelebrityToEdit });
    })
    .catch((err) => {
      console.log("Error while getting movie details: ", err);
      next(err);
    });
});

router.post("/celebrities/:celebrityId/edit", async (req, res, next) => {
  try {
    const { celebrityId } = req.params;
    const { name, occupation, catchPhrase } = req.body;

    const theCeleb = await Celebrity.findByIdAndUpdate(
      celebrityId,
      {
        name,
        occupation,
        catchPhrase
      },
      {
        new: true,
      }
    );
    res.redirect(`/celebrities/${theCeleb._id}`);
  } catch (err) {
    console.log("Error while editing the movie: ", err);
    next(err);
  }
});

module.exports = router;