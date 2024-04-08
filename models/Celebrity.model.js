const mongoose = require("mongoose");
const celebritySchema = mongoose.Schema({
    name: {
        type: String,
        reequired: true,
        unique: true,
    },
    occupation: {
        type: String,
        reequired: true
    },
    catchPhrase: {
        type: String,
        reequired: true
    }
});
const Celebrity = mongoose.model("Celebrity", celebritySchema);
module.exports = Celebrity;
