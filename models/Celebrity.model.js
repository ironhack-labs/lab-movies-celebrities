//  Add your code here
const { Schema, model, SchemaTypes } = require("mongoose");

const celebritySchema = new Schema({
  name: String,
  occupation: String,
  catchPhrase: String,
moviePlayed: {
    type:Schema.Types.ObjectId,
    ref:"Movies"
}
});

module.exports = model("Celebrity", celebritySchema);
