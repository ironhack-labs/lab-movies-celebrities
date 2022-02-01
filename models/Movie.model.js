//Schema para el modelo de Movies


const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast: {
      type: [Schema.Types.ObjectId],
      ref: "Celebrity",
  },
},

{
  toJSON: { //no es necesario cuando utilizamos [Schema.Types.ObjectId]
    virtuals: true,
  },
},

{
  timestamps: true,
}


);


movieSchema.virtual("casting", {
  
  ref: "Celebrity", 
  foreignField: "_id",
  localField: "cast",
});

const Movie = model("Movie", movieSchema);

module.exports = Movie;