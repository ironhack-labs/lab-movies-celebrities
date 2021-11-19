const { Schema, model } = require("mongoose");

const celebritySchema = new Schema({
  name: {
    type: String, 
    required: true,
    //unique: true,
  },
  occupation: String,
  catchPhrase: String,
},
{
  timestamps: true,
});

// model(name of the Model, variable of schema)
// mongoDB is going to take "Celebrity" and create collection-->celebrities 
const Celebrity = model("Celebrity", celebritySchema);
module.exports = Celebrity;



