

const {Schema, model} = require("mongoose")

const celebSchema = new Schema ({

name: {
    type: String,
},

occupation: {
    type: String,
},

catchPhrase: {
    type: String,
}

})

const Celebrity = model("Celebrity", celebSchema);

module.exports = Celebrity;
