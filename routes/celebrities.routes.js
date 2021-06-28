const router = require("express").Router();
const CelebrityModel = require("../models/Celebrity.model")

//LIST GET
router.get("/celebrities", (req, res, next) => {
  
    CelebrityModel.find()
    .then((allCelebrities) => {
        res.render("celebrities/celebrities.hbs", {allCelebrities});

    }).catch((err) => {
        next(err)
    });

});
///CREATE GET
router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity.hbs");
  });
//CREATE POST
router.post("/celebrities/create", (req, res, next) => {
    
    const {name, occupation, catchPhrase} = req.body
    CelebrityModel.create({name, occupation, catchPhrase})
        .then(() => {
          res.redirect('/celebrities')
        })
        .catch(() => {
            res.redirect('/celebrities/create')
            next(' Error Missing info, Try again!')
        })
  });

// EDIT CELEB

router.get('/celebrities/:id/edit', (req, res, next) => {
    let celebrityId  = req.params.id
    CelebrityModel.findById(celebrityId)
    .then((singleCelebrity) => {
        res.render('celebrities/edit-celebrity.hbs', {singleCelebrity})
    }).catch((err) => {
        next(err)
    });

})
router.post('/celebrities/:id/edit', (req, res, next) => {
  let celebrityId  = req.params.id
  const {name, occupation, catchPhrase} = req.body

  CelebrityModel.findByIdAndUpdate(celebrityId , {name, occupation, catchPhrase})
    .then(() => {
        res.redirect('/celebrities')
    })
    .catch(() => {
        next('Edit failed')
    })
});


//DELETE
  router.post('/celebrities/:id/delete', (req, res, next) => {
    let celebrityId = req.params.id
  
    CelebrityModel.findByIdAndDelete(celebrityId)
      .then(() => {
          res.redirect('/celebrities') 
      })
      .catch(() => {
          next('Deleting specific todo failed')
      })
  });
  
  
module.exports = router;
