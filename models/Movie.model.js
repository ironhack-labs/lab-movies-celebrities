
//Remember, the SCHEMA 📝 enforces a certain standard for how we want the dataMODEL 📊 to be in our DB (I think!)

const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [{
        type: Schema.Types.ObjectId,         
        ref: "Celebrity",
    }],
  },
  {
  timestamps: true,
})

//With the creation of authors in our application, we have exported that data to our MongoDB under our library-project

module.exports = model("Movie", movieSchema);