const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const celebritiesSchema = new Schema(
  {
    name: {
      type: String,
    },
    occupation : {
      type: String, 
    },
    catchPhrase : {
      type: String,
    },
    },
);

module.exports = model("Celebrity", celebritiesSchema);


