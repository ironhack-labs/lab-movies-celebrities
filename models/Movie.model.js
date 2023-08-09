//  Add your code here
const { Schema, model } = require("mongoose");

const MovieSchema = new Schema({
  tile: String,
  genre: String,
  genre: String,
  cast: [
    {
      type: Schema.Types.ObjectId,
      ref: "Celebrity",
    },
  ],
});

module.exports = model("Celebrity", celebritySchema);
