//  Add your code here
const mongoose = require("mongoose");

const celebritySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    occupation: {
      type: String,
    },
    catchPhrase: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

celebritySchema.virtual("movies", {
  ref: "Movie",
  justOne: false,
  localField: "_id",
  foreignField: "cast",
});

const Celebrity = mongoose.model("Celebrity", celebritySchema);
module.exports = Celebrity;
