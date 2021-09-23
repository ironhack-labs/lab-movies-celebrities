const User = require("../models/User.model");
const bcryptjs = require("bcryptjs")
const saltRounds = 10

exports.signUp = (req, res) => {
    res.render("auth/signup")
}
exports.signUpSubmit = async (req, res) => {
    const { username, email, password } = req.body

    const salt = await bcryptjs.genSalt(saltRounds)


}

exports.login = (req, res) => {
    res.render("auth/login")
}