// controllers/userController.js

exports.createProfile = async (req, res) => {
  res.render("users/profile", { foundUser: req.session.currentUser });
};
