const mongoose = require("mongoose")

const teamsSchema = new mongoose.Schema({
    name: String,
    nationality: String,
    ligue: String,
    founded: Date,
    formerPlayers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }],
}, {
    timestamps: true
})

const Team = mongoose.model("Team", teamsSchema)

module.exports = Team