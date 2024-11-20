const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema ({
    title:{
        type: String,
        required: [true, "A name is required"]
    },
    genre: {
        type: [String],
        required:[true, "A genre is required"]
    },
    plot:{
        type: String,
        required: [true, "A plot is required"]
    },
    cast: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Celebrity', // The name of the model you want to reference
        }
      ],
      
        
});
  


const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie;