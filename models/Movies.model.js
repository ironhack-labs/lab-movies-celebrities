
const { Schema, model } = require("mongoose");



/* title - String
genre - String
plot - String
cast - Array of object IDs referencing the Celebrity model (basically, the array of celebrities' IDs)
 */


const moviesSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  _cast:[{
    type:Schema.Types.ObjectId,
    ref:"Celebrity" //este es el nombre con el que exportamos mi otro model
} ]
});

module.exports = model("Movies", moviesSchema);
