const User = require("../models/User.model")
const bcryptjs = require("bcryptjs")
const saltRounds = 10

exports.signUp = (req, res) => {
    res.render("auth/signup")
}
exports.signUpSubmit = async (req, res) => {
    const { username, email, password } = req.body
    try {
        if (!username || !email || !password || !username.length || !email.length || !password.length) throw new Error("Uno o mas campos son erroneos")

        const salt = await bcryptjs.genSalt(saltRounds)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = await User.create({
            username,
            email,
            passwordHash: hashedPassword,
        })

        console.log(newUser)

        res.redirect("/auth/login")
    } catch (error) {
        res.render("auth/signup", { errorMessage: error.message })
    }
}

exports.login = (req, res) => {
    res.render("auth/login")
}

exports.loginSubmit = async (req, res) => {
    const { username, password } = req.body
    try {
        if (!username || !password || !username.length || !password.length) throw new Error("Uno o mas campos son erroneos")
        const foundUser = await User.findOne({ username })
        console.log(foundUser)
        if (!foundUser) throw new Error("El usuario o la contraseña son erróneas. Intenta nuevamente")

        const passwordMatch = await bcryptjs.compareSync(password, foundUser.passwordHash)

        if (!passwordMatch) throw new Error("La contraseña es incorrecta. Intenta nuevamente")

        req.session.currentUser = foundUser

        res.redirect("/")
    } catch (error) {
        res.render("auth/login", { errorMessage: error.message })
    }
};

exports.logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) console.log(err)
        res.redirect("/")
    })
}