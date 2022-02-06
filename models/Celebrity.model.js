const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const celebritySchema = new Schema (
 {
   name: { 
      type: String,
      required: true,
      default: 'Anonymous',
   },
   occupation: {
       type: String,
       required: true,
       default: 'Unknown'
   },
   catchPhrase: {
       type: String,
       required: true,
       default: 'Unknown',
   },
 },
   
 {
   timestamps: true
 }
);
const Celebrity = mongoose.model('Celebrity', celebritySchema)
module.exports = Celebrity;
