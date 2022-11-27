//  Add your code here
const { Schema, model } = require("mongoose");

const { Schema} = mongoose;

const celebritySchema = new Schema ({
    name: { type: String },
    occupation: { type: String},
    catchPhrase: { type: String},

})


const Celebrity = mongoose.model('celebrity', celebritySchema);

module.exports = Celebrity; 
