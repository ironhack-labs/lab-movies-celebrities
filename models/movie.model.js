const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const movieSchema = new Schema (
 {
    title: { 
      type: String,
      required: true,
      default: 'Unknown',
   },
   genre: {
       type: String,
       required: true,
       default: 'Unknown'
   },
   plot: {
       type: String,
       required: true,
       default: 'Unknown',
   },
   cast: {
        type:[Schema.Types.String],
        ref: 'Celebrity',
      
    },
 },
   
 {
   timestamps: true
 }
);
const Movie = mongoose.model('Movie', movieSchema)
module.exports = Movie;

