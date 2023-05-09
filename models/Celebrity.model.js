const { Schema, model, models } = require("mongoose");

const celebritySchema = new Schema({
  name: String,
  occupation: String,
  catchPhrase: String,
});

module.exports = models.Celebrity || model("Celebrity", celebritySchema);

