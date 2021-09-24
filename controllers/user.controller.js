exports.createProfile = async (req, res) => {
    //console.log(req.session.currentUser)
    res.render("users/profile", {foundUser: req.session.currentUser })

}