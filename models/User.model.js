const {Schema, model} = require('mongoose');

const userSchema = new Schema({
  username:{
    type:String,
    required:true,
    unique:[true,'Needs to be unique!']
  },
  password:{
    type:String,
    required:true
  }
})

const User = model('User', userSchema);

module.exports = User