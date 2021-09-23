const mongoose = require("mongoose")

//schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Ingresar un usuario válido."]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Ingresar un correo válido."],
        lowercase: true
    },
    passwordHash: {
        type: String,
        required: [true, "Ingresar contraseña válida"]
    },
    movies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "movies"
    }]
})

const User = mongoose.model("User", userSchema)

module.exports = User