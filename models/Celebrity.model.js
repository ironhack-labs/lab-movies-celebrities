//  Add your code here
const {Schema, model} = require('mongoose');

const celebritySchema = new Schema(
{
   name : { 
    type: String,
    require: true
   },
   ocupation: String, 
   catchPhrase: String,
},
{
    timestamps: true
}
)

//createdAt
//updatedAt

const Movie = model("Celebrity", celebritySchema)

module.exports = Movie;
