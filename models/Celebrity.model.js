const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const celebritySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  occupation: String,
  catchPhrase: String,
});

const Celebritiy = mongoose.model("Celebrity", celebritySchema);
module.exports = Celebritiy;
