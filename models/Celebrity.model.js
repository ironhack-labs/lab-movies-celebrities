//  Add your code here
const mongoose = require('mongoose')



const celebritiesSchema = new mongoose.Schema({
    name : String,
    occupation : String,
    catchPhrase : String
   
  });


const CelebrityModel = mongoose.model('characters', celebritiesSchema)

module.exports = CelebrityModel