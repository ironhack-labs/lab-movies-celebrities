const { Schema, model } = require("mongoose");


const characterSchema = new Schema(
  {
    name: {
      type: String,
      unique: true
    },
    occupation: String,
    mainSuperPower: String,
  },
  {
    timestamps: true,
  }
);

const Character = model("Character", characterSchema);

module.exports = Character;
