//  Add your code here
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const movieSchema = new Schema ({
    title: {
        type: String,
        set: value => value.charAt(0).toUpperCase() + value.substring(1).toLowerCase(),
        required : true
    },
   genre: {
       type: String,
      default: 'Nombre desconocido',
         trim: true,
           set: value => value.charAt(0).toUpperCase() + value.substring(1).toLowerCase(),
       required: true

   },
     plot: {
      type: String,
      required: true
    },
    cast: {
    type: Schema.Types.ObjectId,
    trim: true
 }
})


const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie