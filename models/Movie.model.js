const { Schema, model, SchemaType } = require("mongoose");

//Schema
const movieSchema = new Schema(
  {
    title: String,
    genre: String,
    plot: String,
    cast:{
        type:Schema.Types.ObjectId,
        ref:"Celebrity"
    }
  },
  { timestamps: true }
);

//exports

module.exports = model("Movie", movieSchema);
