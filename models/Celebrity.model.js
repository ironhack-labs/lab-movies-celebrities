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
// mongoDB is going to take "Celebrity" model and create collection-->celebrities 
const Celebrity = model("Celebrity", celebritySchema);
module.exports = Celebrity;



// const mongoose = require('mongoose');

// const celebritySchema = new mongoose.Schema({
//   name: {
//     type: String, 
//     required: true,
//     //unique: true,
//   },
//   occupation: String,
//   catchPhrase: String,
// },
// {
//   timestamps: true,
// });

// // mongoose will turn "Celebrity" into the collection "celebrities"
// const Celebrity = mongoose.model("Celebrity", celebritySchema);

// module.exports = Celebrity;



