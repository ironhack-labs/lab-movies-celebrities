const mongoose = require("mongoose");

const celebritySchema = mongoose.Schema({
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

celebritySchema.virtual("movies", {
  ref: "Movie",
  justOne: false,
  localField: "_id",
  foreignField: "cast",
});
const Celebrity = mongoose.model("Celebrity", celebritySchema);
module.exports = Celebrity;
