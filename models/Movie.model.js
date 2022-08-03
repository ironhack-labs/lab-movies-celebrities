const { Schema, model } = require('mongoose');

const MovieSchema = new Schema(
  {
    title: String,
    genre: String,
    plot: String,
    cast: [{ type: Schema.Types.ObjectId, ref: 'Celebrity' 
    }]
    

        /*   author: { type: Schema.Types.ObjectId, ref: 'User' }, */
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", MovieSchema)

module.exports = Movie;