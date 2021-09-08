const express = require('express')
const router = express.Router();

// MIDDLEWARE: your iwn middleware
//next() tells express that the middleware functions had done its work
function isLoggedIn(req, res, next) {
    if(req.session.currentUser) { // if current user found
        next()
    } else {
        res.redirect("/auth/login")
    }
}

function isAdmin(req, res, next) {
    if(req.session.currentUser && req.session.currentUser.username.includes("ironhack")) { // use any criteria to check
        req.session.currentUser.isAdmin = true
        req.session.currentUser.isInternal = true;
    } else if (req.session.currentUser){
        req.session.currentUser.isAdmin = false;
        req.session.currentUser.isInternal = false;       
    } else {
        res.redirect("/auth/login")
    }
    next()
}

// invoke your middleware functions in your router request, do not declare the inside

router.get("/profile", isAdmin, (req, res) => {
    if(req.session.currentUser.isAdmin)res.render("profile", {user: req.session.currentUser})
    else res.redirect("/private")
})

router.get("/", isLoggedIn, (req, res) => {
    res.render("private")
})

module.exports = router;