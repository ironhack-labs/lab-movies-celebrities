//  Add your code here
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const celebritySchema = new Schema({
    name: {
        type: String,
        unique: true,
      },
  
    occupation: String,
    catchphrase: String,
});

const Celebrity = mongoose.model("Celebrity", celebritySchema);

module.exports = Celebrity;
