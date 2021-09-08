// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model');

// all your routes here
function isLoggedIn(req, res, next) {
  if(req.session.currentUser) { // if current user found
      next()
  } else {
      res.redirect("/auth/login")
  }
}

router.get('/',isLoggedIn, (req, res) => {
    Celebrity.find()
    .then(allCelebrities => {
        console.log(allCelebrities)
      res.render('celebrities/celebrities', {allCelebrities})
    }).catch((error)=> {console.log('upsie, this is not cool!', error)})
  });

router.get('/create', isLoggedIn, (req, res)=> {
    res.render('celebrities/new-celebrity');
})

router.post('/create', isLoggedIn, (req, res)=> {
    const {name, occupation, catchphrase} = req.body
    Celebrity.create({name, occupation, catchphrase})
    .then(newCelebrity => res.redirect('/celebrities'))
    .catch(error => res.render('celebrities/new-celebrity'))
})

module.exports = router;
