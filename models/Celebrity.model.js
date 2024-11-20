const mongoose = require("mongoose");

const CelebritySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A name is required"],
  },
  occupation: {
    type: String,
    required: [true, "An occupation is required"],
  },
  catchFrase: {
    type: String,
    required: [true, "A catch frase is required"],
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'
  }
});

const Celebrity = mongoose.model("Celebrity",CelebritySchema );
module.exports = Celebrity;
