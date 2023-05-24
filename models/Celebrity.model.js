const mongoose = require("mongoose");

const celebritySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    default: "unknown"
  },
  catchPhrase: {
    type: String,
    required: true
  }
});
console.log(celebritySchema);
const Celebrity = mongoose.model("Celebrity", celebritySchema);

// Connect to the database and log the status
mongoose
  .connect("mongodb://localhost:27017/celebrity", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.log("Error connecting to the database:", error);
  });

module.exports = Celebrity;
