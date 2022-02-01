//  Add your code here
const { model, Schema } = require("mongoose");

const celebritySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    occupation: String,
    catchPhrase: String,
  },
  { timestamp: true }
);

modules.export = model("Celebrity".celebritySchema);
