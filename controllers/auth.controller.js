const User = require("../models/User.model");

exports.signUp = (req, res) => {
    res.render("auth/signup")
}
exports.signUpSubmit = (req, res) => {
    const { username, email, password } = req.body
}

exports.login = (req, res) => {
    res.render("auth/login")
}