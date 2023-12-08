//  Add your code here
const mongoose = require("mongoose"); 

const CelebritySchema = mongoose.Schema({
    name: {
        type: String, 
        required: true,
    }, 
    occupation: {
        type: String,
      },
      catchPhrase: {
        type: String,
      },
    });
    
    CelebritySchema.virtual("movies", {
      ref: "Movie", // The model to use
      justOne: false, // If set to true, returns one document. If false, returns a cursor
      localField: "_id", // Find people where `localField`
      foreignField: "cast", // is equal to `foreignField`
    });
    
    const Celebrity = mongoose.model("Celebrity", CelebritySchema);
    module.exports = Celebrity;
    