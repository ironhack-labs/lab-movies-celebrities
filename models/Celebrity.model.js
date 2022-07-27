const mongoose = require("mongoose");

const celebritySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add celebrity name"],
  },
  occupation: {
    type: String,
    default: "Unknown",
  },
  catchPhrase: {
    type: String,
    required: [true, "Every celebrity needs a good catch phrase"],
  },
});

const Celebrity = mongoose.model("Celebrity", celebritySchema);

module.exports = Celebrity;
