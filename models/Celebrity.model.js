//  Add your code here


//Remember, the SCHEMA 📝 enforces a certain standard for how we want the dataMODEL 📊 to be in our DB (I think!)

const { Schema, model } = require("mongoose");

const celebritySchema = new Schema({
    name: String,
    occupation: String,
    catchphrase: String,
  },
  {
  timestamps: true,
})

//With the creation of celebs in our application, we have exported that data to our MongoDB under our library-project
module.exports = model("Celebrity", celebritySchema);