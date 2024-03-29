//  Add your code here
const { Schema, model } = require("mongoose");


const CelebritySchema = new Schema (
  {
    name: {
      type: String,
    },
    occupation: {
      type: String,
    }, 
    catchPhrase: {
        type: String, 
    }

  }
);

const Celebrity = model("Celebrity", CelebritySchema );

module.exports = Celebrity;