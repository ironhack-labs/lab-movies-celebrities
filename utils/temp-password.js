function isTempPassword (req, res, next){
    if(req.session.currentUser){
        if(req.session.currentUser.isTempPassword){
            req.flash("bannedMessage", "I am sorry you have to create a new password before navigating in the website.");
            res.redirect ("/login/resetPassword")
        }
    }
    next();
}

module.exports = isTempPassword;