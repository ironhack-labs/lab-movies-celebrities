const {Schema,model} = require("mongoose")

const celebritySchema= new Schema({
  name:
  {
    type:String,
    required:true
  },

  occupation:
  {
    type:String,
    default:'unknown',
  },

  catchPhrase:
  {
    type:String,
    required:true,

  },

});

const CelebrityModel=model("celebrity",celebritySchema)

module.exports=CelebrityModel;