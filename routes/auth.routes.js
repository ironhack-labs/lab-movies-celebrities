const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const User = require("../models/User.model");
const transporter = require("../config/nodemailer");

router.get("/signup", (req, res, next) => {
    res.render ("auth/sign-up");
});

router.post(("/signup"), async (req, res, next)=>{
    const saltRounds = 10;
    const {username, email, password, confirmationEmail} = req.body;

    // bcryptjs
    // .genSalt(saltRounds)
    // .then((salt)=>{
    //     return bcryptjs.hash(password, salt);
    // })
    // .then((hashedPassword)=>{
    //     return User.create({username, email, password: hashedPassword});
    // })
    // .then((user)=>{
    //     console.log("User was added:", user);
    //     res.redirect("/login");
    // })
    // .catch((err)=>{
    //     next(err);
    // })

    try{
        const salt = await bcryptjs.genSalt(saltRounds);
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword,
            regular: true,
            admin: false,
            banned: false,
            isTempPassword: false
        })

        if(confirmationEmail){
            const signUpEmail = await transporter.sendMail({
                from: "movies&celebrities@mail.com",
                to: email,
                subject: "Thank you for signing up",
                text: "Thank you for signing up", 
                html: `<h2>Hi there, ${username}</h2>
                <h4>Thank you for signing up. Can't wait for you to add new movies in our database.<h4>
                <hr>
                <p>You can now add your favorite movies and showcase them to other users. Good luck 😊.
                <br><img src="https://i.gifer.com/2DV.gif" style="width: 150px; margin-top: 20px">
                <p> Sincerely, <br>your Movies&Celebrities Team</p>`
            });
        }
        
        req.flash("successMessage", "Your account was successfully created.")
        res.redirect("/login");
    } catch(err) {
        req.flash("errorMessage", "Sign up unsuccessful " + err)
        res.redirect("/signup");
    }
});


router.get("/login", (req, res, next) => {
    res.render ("auth/log-in");
});


router.post("/login", (req, res, next) => {
    const {email, password} = req.body;

    if (email === '' || password === '') {
        req.flash("errorMessage", "Password and email cannot be blank");
        res.redirect('/login');
        return;
    }

    User.findOne({email: email})
    .then((user)=>{
        if (!user){
            req.flash("errorMessage", "Password or email are incorrect.");
            res.redirect("/login");
            return;
        }
        else if (bcryptjs.compareSync(password, user.password)){
            req.session.currentUser = {
                username: user.username, 
                email: user.email,
                password: user.password,
                _id: user._id,
                regular: user.regular,
                admin: user.admin,
                banned: user.banned,
                isTempPassword: user.isTempPassword
            };
            console.log("Current User:",  req.session.currentUser);
            
            if(req.session.currentUser.isTempPassword){
                req.flash("successMessage", "Your password needs to be updated.");
                res.redirect("/login/resetPassword");
            } else{
                req.flash("successMessage", "You successfully logged in.");
                res.redirect ("/");
            }
        }
        else{
            req.flash("errorMessage", "Password or email are incorrect.");
            res.redirect("/login");
        }
    })
    .catch((err)=>{
        next(err);
    })
});

router.get("/login/forgotPassword", async (req, res, next)=>{
    res.render("auth/forgot-password");
});

router.post("/login/forgotPassword", async (req, res, next)=>{
    const email = req.body.email;

    try{
        const user = await User.findOne({email: email});
        if(!user){
          req.flash("errorMessage", "Email Not Found")
          res.redirect("/forgotPassword");
          return;

        } else {
          let newPassword = '';
          const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          const charactersLength = characters.length;
          let counter = 0;

          while (counter < 10) {
            newPassword += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
          }
      
          const salt = await bcryptjs.genSalt(10);
          const hashedPassword = await bcryptjs.hash(newPassword, salt)
          const updateUser = await User.findByIdAndUpdate(
            user._id,
            {
                password: hashedPassword,
                isTempPassword: true
            }
          );
      
      
          const resetEmail = await transporter.sendMail({
            from: "movies&celebrities@mail.com", // sender address
            to: email,
            subject: "Password Reset", // Subject line
            text: "You Requested to reset your password", // plain text body
            html: `<h2>You requested to reset your password</h2><hr>
            <p>Your temporary password is <b>${newPassword}</b>, use it to create another password.</p>
            <p>Use the provided temporary password to log in and to create a new password. Make sure you won't forget next time ;)</p><hr>
            <p> Sincerely,<br>your Movies&Celebrities Team</p>`// html body
          });
      
          res.redirect("/login");
        }
    } catch(err){
        next(err);
    }
      
});

router.get("/login/resetPassword", async (req, res, next)=>{
    res.render("auth/reset-password");
});

router.post("/login/resetPassword", async (req, res, next)=>{
    const {temporaryPassword, password} = req.body;

    try{
        if(bcryptjs.compareSync(temporaryPassword, req.session.currentUser.password)){
            //generate new password
            const salt = await bcryptjs.genSalt(10);
            const newHashedPassword = await bcryptjs.hash(password, salt);

            //update user
            const updateUserPass = await User.findByIdAndUpdate(req.session.currentUser._id, {password: newHashedPassword, isTempPassword: false});

            //update session
            req.session.currentUser.password = newHashedPassword;
            req.session.currentUser.isTempPassword = false;
            console.log(req.session.currentUser)

            //redirect
            req.flash("successMessage","Your password was updated.");
            res.redirect("/");

        } else{
            req.flash("errorMessage","The temporary password is incorrect.");
            res.redirect("/login/resetPassword");
        }
        
    } catch (err){
        next(err)
    }

});

router.post("/logout", (req, res, next) =>{
    req.session.destroy((err)=>{
        if(err) next(err);
        res.redirect ("/");
    })
});

router.get("/users", (req, res, next) => {
    if(!req.session.currentUser.admin){
        res.redirect("/")
    }

    User.find({$and: [{admin: {$ne: true}}, {banned: {$ne: true}}]})
    .then((users)=>{
      res.render("auth/users", {users});
    })
    .catch((err)=>{
      next(err);
    })
});


router.post("/users/delete/:id", (req, res, next) => {
    if(!req.session.currentUser.admin){
        res.redirect("/")
    }

    User.findByIdAndDelete(req.params.id)
    .then(()=>{
        req.flash("successMessage", "Your deletion was successful.");
        res.redirect("/users")
    })
    .catch((err)=> next(err));
});

router.post("/users/banUser/:id", (req, res, next) => {
    if(!req.session.currentUser.admin){
        res.redirect("/")
    }

    User.findByIdAndUpdate(req.params.id,{banned: true, regular: false})
    .then((user)=>{
        req.flash("successMessage", `${user.username} is now banned`);
        res.redirect("/users")
    })
    .catch((err)=> next(err));
});


  

module.exports = router;
  



