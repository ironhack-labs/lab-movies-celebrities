//  Add your code here
const { Schema, model } = require("mongoose");


const celebritieSchema = new Schema(
  {
    name: {type:String,required:true},
    occupation:{type:String,required:true},
    catchPhrase: {type:String,required:true},
  },
  { timestamps: true,
});

const celebrityModel = model("Celebrity", celebritieSchema);

module.exports = celebrityModel ;