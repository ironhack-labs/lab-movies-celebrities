const { Schema, model } = require("mongoose");

const celebritySchema = new Schema({
  name: {
    type: String, 
    required: true,
    //unique: true,
  },
  occupation: String,
  catchPhrase: String,
});

// model(name of the Model, name of the schema)
// mongoDB is going to take "Celebrity" and create collection-->celebrities 
const Celebrity = model("Celebrity", celebritySchema);
module.exports = Celebrity;



