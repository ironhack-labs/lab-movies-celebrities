//  Add your code here
//1 -- Importaciones
const mongoose = require("mongoose");

//2 -- Schema
const celebSchema = mongoose.Schema(
  {
    name: String,
    occupation: String,
    catchPhrase: String,
  },
  {
    timestamps: true,
  }
);

//3 -- Model
const Celebrity = mongoose.model("Celebrity", celebSchema);

//4 -- Exportación
module.exports = Celebrity;
