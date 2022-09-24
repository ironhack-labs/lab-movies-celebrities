const express = require('express');
const router = express.Router();
const User = require("../models/User")
const bcryptjs = require('bcryptjs');





router.get('/signup', (req, res, next) => {
    res.render('auth/signup');
});

router.post('/signup', (req, res, next)=>{
    const saltRounds = 12;
    bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(req.body.password, salt))
    .then(hashedPassword => {
      console.log(`Password hash: ${hashedPassword}`);
      User.create({
        username: req.body.username,
        password: hashedPassword,
    })
      res.redirect('/')
    })
    .catch(error => next(error));
});

router.get('/login', (req, res, next) => {
    res.render('./auth/login');
});


router.post('/login', (req, res, next) => {
    if (req.body.username === '' || req.body.password === '') {
      res.redirect('/login');
      return;
    }
   
    User.findOne({ username: req.body.username })
      .then(resultFromDB => {
        console.log(resultFromDB)
        if (!resultFromDB) {
          res.redirect('/login');
          return;
        } else if (bcryptjs.compareSync(req.body.password, resultFromDB.password)) {
          console.log("found user", resultFromDB);
          console.log({info: req.body})
          req.session.currentlyLoggedIn = resultFromDB;
          console.log(req.session);
          res.redirect('/');
          return;
        } else {
          res.redirect('/login');
        }
      })
      .catch(error => next(error));
  });

  router.get('/profile', (req, res, next)=>{
    User.findById(req.session.currentlyLoggedIn._id)
    .then((theUser)=>{
      console.log(theUser);
      res.render('auth/profile', {theUser: theUser})
    })
    .catch((err)=>{
      next(err)
    })
  });

  router.post('/logout', (req, res, next)=>{
    req.session.destroy(err => {
      if (err) console.log(err);
      res.redirect('/');
    });
  });


  router.get('/change-password', (req, res, next)=>{
    res.render("auth/change-password", {theUser: req.session.currentlyLoggedIn});
  })

  router.post('/new-password', (req, res, next)=>{

    if(req.body.newpass !== req.body.confirmnewpass){
      res.redirect("/profile")
      // need to show an error message here but cant yet
    }
  
    User.findById(req.session.currentlyLoggedIn._id)
    .then(resultFromDB => {
       if (bcryptjs.compareSync(req.body.oldpass, resultFromDB.password)) {
        const saltRounds = 12;
        bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(req.body.newpass, salt))
        .then(hashedPassword => {
          
          User.findByIdAndUpdate(req.session.currentlyLoggedIn._id, {
            password: hashedPassword
          })
          .then(()=>{
            res.redirect('/profile');
  
          })
        })
          .catch((err)=>{
            next(err);
          })
    }
  })
  });


  router.post('profile/:id', (req, res, next) => {
      const userLikedMovie = {likes: req.body.likes}

      User.findByIdAndUpdate(req.params.id, userLikedMovie)
      .then(theLikedMovie => {
        console.log(`The liked movie `, userLikedMovie);
        res.redirect(`/profile/${theLikedMovie.id}`)
      })
  })


module.exports = router;