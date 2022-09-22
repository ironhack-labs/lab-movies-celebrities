const { Router } = require('express');
const router = new Router();

const bcryptjs = require(`bcryptjs`);
const saltRounds = 10;
const User = require('../models/User.model');
const { default: mongoose } = require('mongoose');
const { route } = require('./index');



//START-SIGNUP ROUTES

router.get(`/signup`,  (req, res, next) => {// remeber you need a "/" in the route for the local host!
    res.render(`auth/signup`)
})

router.post(`/signup`, (req, res, next )=>{
    // console.log(req.body) getting the right responses 
    const { username, email, password } = req.body;

    if(!username || !email || !password) {
      res.render(`auth/signup`, {errorMessage: `✖Please fill out all feilds!!!!`})
      return;
  }


    //PASSWORD STRENGTH CHECKER!!!
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if(!regex.test(password)){
      res
        .status(500)
        .render(`auth/signup`, {errorMessage: `Password needs to have at least 6 characters and must contain at least one number and one lowercase and uppercase letter `})
        return;
    }



    bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(password, salt))
        .then(hashedPassword => {
            return User.create({
                username,
                email,
                passwordHash: hashedPassword,
                
            })
        })
        .then(userFromDb => { // userFromDb is the result of the .Create fucntion?
        //    console.log(`New User CREATED: `, userFromDb) checking if we got it in the database here. (WE GOT IT)
          res.redirect(`/userProfile`)

        })



})

// POST ROUTE NEEDED TOO TO GET THE SIGN UP FORM DATA ETC

//END-SIGNUP ROUTES






//START - PROFILE PAGE

router.get(`/userProfile`, (req, res, next) => {
    //userInSession will be called on the user-profile.hbs file in the {{}}

    User.findById(req.session.currentUser).populate('likedMovies')
    .then(movies=>{
        console.log({TESTTTTTT: movies})

        res.render('users/user-profile', { userInSession: req.session.currentUser, properMovies: movies });

        
    })


  
  
  });


//END - PROFILE PAGE

//START-LOGIN ROUTES

router.get(`/login`, (req, res, next) => {
    res.render(`auth/login`)

})

//POST ROUTE NEEDED TOO
router.post(`/login`, (req, res, next) => {
    console.log('SESSION =====> ', req.session);
// console.log(req.body); getting the correct data from the input feild but need to HASH the password cause we don't want to compare the login attempt password with the DbにあるpasswordHASH SUM
const { email, password } = req.body;
//Throws Error is Person attempting login leaves 1 field blank
if (email === `` || password === ``) {
  res.render(`auth/login`, {// if true that 1 field is blank, then...
    errorMessage: `Please fill out all fields!`//.. return this error message in the error message box on the other page.
  })
  return; // so the rest of the code doesn't run
}

//Verifying if user exists in db (checking if input email is registered)
User.findOne({ email })// chceks if email exsits in db
.then(user => { //user is param placeholder. Represnets the response from the DB(true/false)
  if (!user) {//if no user in db inform person who is trying to login
    res.render(`auth/login`, {errorMessage: `Email is not registered. Try with other email.`});
    return;
  } 

  //if user exists in db, comapre inputted password hash sum to DBにあるHash Sum
  else if(bcryptjs.compareSync(password, user.passwordHash)) {
    //if provided password hash sum === dbにあるhash sum then pass
    //user object to this view ------------
        //res.render(`users/user-profile`, {user});// "user" is the　DBに存在確認済みのuser; See User.findOne({user}) above.


        //res.render() line above is removed when this line 120 and 121 are added
        req.session.currentUser = user;
        res.redirect(`/userProfile`);


      } else {
        //if provided password hash sum doesn't === db にあるhash sum for this user then rerturn error message to viewer
        res.render(`auth/login`, {errorMessage: `Incorrect password`})
      }
    })
    .catch(error => {
      next(error);
    })

})




//END-LOGIN ROUTES









module.exports = router;