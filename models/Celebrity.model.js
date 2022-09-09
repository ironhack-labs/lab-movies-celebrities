//  Add your code here
const { Schema, model } = require("mongoose");

const celebritySchema = new Schema(
  {
    name: {
      type: String,
      unique: true
    },
    ocupation: {type: String},
    catchPhrase: {type: String}
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Celebrity = model("User", celebritySchema);

module.exports = Celebrity;
