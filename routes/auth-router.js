const express = require("express");
const authRouter = express.Router();
const User = require("../models/user-model");


const bcrypt = require("bcryptjs");
const saltRounds = parseInt(process.env.SALT) || 10; //process.env.SALT || 10; mejor esta version, en un archivo separado .env
// it's better to go for 10

// POST    '/auth/signup'
authRouter.post("/signup", (req, res, next) => {
    // 1. Get the username and password from req.body
    const { username, password } = req.body;
  
    // 2.1 Check if the username and password are provided
    if (username === "" || password === "" || password.length < 5 ) {//son campos vacios??
      res.render("auth-views/signup-form", {//renderiza otra vez el formulario de signup
        errorMessage: "Username and Password are required.",
      });
      return; // stops the execution of the function further
    }
  
    // 2.2 Verify the password strength
    // const passwordStrength = zxcvbn(password).score;
  
    // console.log("zxcvbn(password) :>> ", zxcvbn(password));
    // console.log("passwordStrenth :>> ", passwordStrength);
    // if (passwordStrength < 3) {
    //   res.render("auth-views/signup-form", {
    //     errorMessage: zxcvbn(password).feedback.warning,
    //   });
    //   return;
    // }
  
    // 3. Check if the username is not taken
    User.findOne({ username }) // This is the sugar syntax for {"username": username}
      .then((userObj) => {
        if (userObj) {
          // if user was found
          res.render("auth-views/signup-form", {
            errorMessage: `Username ${username} is already taken.`,
          });
          return;
        } else {
          // Allow the user to signup if above conditions are ok
  
          // 4. Generate salts and encrypt the password
         
          const salt = bcrypt.genSaltSync(saltRounds);
          
          const hashedPassword = bcrypt.hashSync(password, salt);
  
          // 5. Create new user in DB, saving the encrypted password
          User.create({ username, password: hashedPassword })
            .then((user) => {
              // 6. When the user is created, redirect (we choose - home page)
              res.redirect("/");
            })
            .catch((err) => {//aqui enviamos el error desde el post//login form
              if(err instanceof mongoose.Error.ValidationError){
                res.render("auth-views/signup-form", {
                  errorMessage: err.message,
                });
                }else{//si el error es de un tipo que no esta en el form el error ira a parar a la siguiente ruta, que esta al final de app.js
                 next(err)
               }
            });
        }
      })
      .catch((err) => next(err));
  
    // X.  Catch errors coming from calling to User collection
  });
  

  authRouter.post("/login", (req, res)=>{
    console.log("yep", req.body)
    
    const {username, password} = req.body
    // 1. Check if the username and password are provided
    if (username === "" || password === "" || password.length < 5){ // || !email.includes("@") checkear email
      res.render("auth-views/login-form", { errorMessage: "Username and Password are required." });
      return; // stops the execution of the function further
    }
  
    User.findOne({username})//even if it's an email or fake identifier
    .then(user=>{
       // 3.1 If the user is not found, show error message
       if (!user) {
        res.render("auth-views/login-form", { errorMessage: "Input invalid" });
      } else {
        //check if the password correct
        console.log("user", user)
        const encryptedPassword = user.password;
        const passwordCorrect = bcrypt.compareSync(password, encryptedPassword);
        //after this line we know that the user exists and if they typed the correct password
  
        if(passwordCorrect){ 
          req.session.currentUser = user;//saves the session of the user, used in site-router
          res.redirect("/")
        }else{ 
        res.render("auth-views/login-form", { errorMessage: "Name OR pwd is incorrect" });
        }
      }
    })
    .catch(err=>console.log(err))
  })


  // GET  '/auth/login'
authRouter.get("/login", (req, res) => {
    console.log("Inside login")
    res.render("auth-views/login-form");
  });
  
  
  // GET    '/auth/signup'     -  Renders the signup form
  authRouter.get("/signup", (req, res) => {
    res.render("auth-views/signup-form");
  });


  module.exports = authRouter