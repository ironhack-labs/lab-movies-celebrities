const mongoose = require("mongoose");
const Schema = mongoose.Schema

const playersSchema = new Schema({
    name: String,
    nationality: String,
    catchPhrase: String
}, {
    timestamps: true
})

const Player = mongoose.model("Player", playersSchema)

module.exports = Player