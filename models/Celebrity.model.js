const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const celebritySchema = new Schema(
    {
        name:{
            type: String
        },
        occupation: {
            type: String
        },
        catchPhrase: {
            type: String
        }
    }
);

celebritySchema.virtual("movies", {
    ref: "Movie", // The model to use
    justOne: false, // If set to true, returns one document. If false, returns a cursor
    localField: "_id", // Find people where `localField`
    foreignField: "cast", // is equal to `foreignField`
  });

const Celebrity = mongoose.model('Celebrity', celebritySchema);
module.exports = Celebrity;