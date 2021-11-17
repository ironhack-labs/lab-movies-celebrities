//  Add your code here
const { Schema, model } = require("mongoose");


const celebritySchema = new Schema({
    name: {type: String, required: true},
    occupation: {type: String, enum: ["actor", "singer", "comedian"], default: "unknown"},
    catchPhrase: {type: String}
  }, {timestamps: true}
);

const Celebrity = model("Book", bookSchema);

module.exports = Celebrity;