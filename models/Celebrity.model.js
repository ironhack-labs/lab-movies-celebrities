const { Schema, model } = require("mongoose");
//({estructura},{optional?: timestamp:true})
const celebritySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      enum: ["Singer", "Actor", "Comedian", "Unknown"],
    },
    catchPhrase: {
      type: String,
    },
  },
  { timestamps: true }
);

//EXPORTS
const Celebrity = model("Celebrity", celebritySchema);

module.exports = Celebrity;
