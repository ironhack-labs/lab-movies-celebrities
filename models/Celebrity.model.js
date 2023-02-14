//  Add your code here
const { Schema, model } = require("mongoose"); // everytime we create a model, this should be at the top

const celebritySchema = new Schema({

    name: String,
    occupation: String,
    catchPhrase: String,
    
}, {
    timestamps: true, 
})

module.exports = model("Celebrity", celebritySchema) 

