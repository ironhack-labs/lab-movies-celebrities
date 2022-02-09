const mongoose = require("mongoose");

const celebritySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
    default: "Unknown",
  },
  catchPhrase: {
    type: String,
    required: true,
  },
});

const Celebrity = mongoose.model("Celebrity", celebritySchema);

// 4. EXPORTACIÓN
module.exports = Celebrity;
