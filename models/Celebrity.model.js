const mongoose = require("mongoose");

const celebritySchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String,
        required: true,
        default: "unknown",
        trim: true,
    },

    occupation: {
        type: String,
        required: true,
        default: "unknown",
    },

    catchPhrase: {
        type: String,
        required: true,
        default: "unknown",
    },

    isSelected: {
        type: Boolean,
        default: false,
    },
});

const newCelebrity = mongoose.model("CelebrityModel", celebritySchema);

module.exports = newCelebrity;