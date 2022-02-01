const { Schema, model } = require("mongoose");

const movieSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    genre: String,
    plot: String,
    cast: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'Celebrity'
    }
},
    { timestamps: true }
);

const Movie = model("Movie", movieSchema);
  
module.exports = Movie;