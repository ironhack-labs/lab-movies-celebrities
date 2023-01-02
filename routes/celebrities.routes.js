const CelebrityModel = require("../models/Celebrity.model");

const router = require("express").Router();

// all your routes here
router.get('/celebrities', (req, res, next) => {
    CelebrityModel.find()
    .then((celebritiesFromDB) => {
        res.render('celebrities/celebrities', { celebrities: celebritiesFromDB});
      })  
        .catch((err) => {
            console.log("Error getting celebrities from DB", err);
            next();
    })
})

router.get('/celebrities/create', (req,res,next) => {
    res.render('celebrities/new-celebrity')
});


router.post('/celebrities/create', (req, res, next) => {
    const newCelebrity = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchphrase: req.body.catchphrase
    }
    CelebrityModel.create(newCelebrity)
        .then((celebrityDetails) => {
        res.redirect('/celebrities')
        })
    .catch((err) => {
     res.render('/celebrities/new-celebrity')
    })
});



module.exports = router;