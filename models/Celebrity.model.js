const { Schema, model, Mongoose } = require('mongoose');
 

const CelebritySchema = new Schema(
  {
    Name: String,
    Occupation: String,
    CatchPhrase: String 
  },
  {
    timestamps: true
  }
);

 
module.exports = model('Celebrity', celebrityschema);