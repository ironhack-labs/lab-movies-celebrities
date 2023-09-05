const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities/create", (req, res) => {
    Celebrity.find()
      .then((celebrities) => {
        res.render("celebrities/new-celebrity", { celebrities });
      })
      .catch((err) => { 
        console.log(`Err while displaying page: ${err}`);
        next(err);
      });
  });



  router.post("/celebrities/create", (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;

    Celebrity.create({ name, occupation, catchPhrase }) 
      .then(() => {
        res.redirect("/celebrities")
      })
      .catch((err) => {
       res.render("celebrities/new-celebrity", err )
      });
    })
  

router.get("/celebrities", (req, res, next) => {
    
    Celebrity.find()
          .then((celebsFromDb ) => {
            console.log(celebsFromDb);
            res.render("celebrities/celebrities", { celebsFromDb });
          })
          .catch((err) => {
           console.log(err);
          });
      });


//Details

router.get("/celebrities/:id", (req, res, next) => {
  const {celebrityId} = req.params;

  Celebrity.findById(celebrityId)
    .then((celebrities) => {
      res.render("celebrities/celebrity-details", { celebrity: celebrities });
    })
    .catch((err) => next(err));
});

//Edit

router.get("/celebrities/:id/edit", (req, res, next) => {
  const {celebrityId} = req.params;
  Celebrity.findById(celebrityId)
    .then((celebrities) => {
      res.render("celebrities/edit-celebrity", { celebrity: celebrities });
    })
    .catch((err) => next(err));
});

router.post("/celebrities/:id/edit", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  const {celebrityId} = req.params;

  Celebrity.findByIdAndUpdate(celebrityId, {
    name,
    occupation,
    catchPhrase,
  },  { new: true })
    .then(updatedCelebrities => res.redirect(`/celebrities/${updatedCelebrities.id}`))
    .catch((err) => next(err));
});

// DELETE

router.get("/celebrities/:id/delete", (req, res, next) => {
  const {celebrityId} = req.params;
  
  Celebrity.findByIdAndDelete(celebrityId)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((err) => next(err));
});


module.exports = router;
