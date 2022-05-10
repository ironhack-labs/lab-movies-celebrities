const {Schema, model} = require('mongoose');
const { getMaxListeners } = require('./Celebrity.model');

const movieSchema = new Schema (
    {
        title : {
            type : String, 
            required : true
        },
        genre : {
            type : String, 
            required : true
        },
        plot : {
            type : String, 
            required : true
        },
        cast : [
            {
                type: Schema.Types.ObjectId,
                ref:"celebrity",
            }
     ],
    });
// Creating the Model
const Movie = model("movie", movieSchema);

// Exporting the Model
module.exports = Movie;
