const User = require("../models/User.model");

const getUserView = async (req, res) => {
  let movies = await User.findById(req.session.currentUser._id).populate("movies");
  res.render("users/profile", movies);
};

module.exports = {
  getUserView,
};
