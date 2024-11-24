const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// or maybe I cam write: const {Schema} = mongoose;

// Define the Celebrity schema
const CelebSchema = new Schema({
  name: {
    type: String,
    required: true// Name is required
  },
  occupation: {
    type: String,
    default: "Unknown", // Default value if not provided
  },
  catchphrase: {
    type: String,
    required: true // Catchphrase is required
  },
});

// Create the Celebrity model
const Celebrity = mongoose.model("Celebrity", CelebSchema);

// Export the model
module.exports = Celebrity;