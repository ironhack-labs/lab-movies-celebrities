const { Schema, model } = require("mongoose");

const celebritySchema = new Schema(
  {
    name: String,
    occupation: String,
    catchPhrase: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Celebrity", celebritySchema);

//primer parámetro es como se llama la coleccion en MongoDB
