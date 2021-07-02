const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// CREATE SCHEMA //no usar demasiados uniques, ralentizan la aplicacion
const userSchema = new Schema({
  username: {type: String,
    required: [true, "Username is required"],
    unique: true,
    match: [ /^\S+@\S+\.\S+$/ , "Please input a valid email"],
    lowercase: true
  },
  password: {
    type: String,
    required: [true, "Password is required"]}
});


// CREATE MODEL
//                           users
const User = mongoose.model('User', userSchema);


// EXPORT
module.exports = User;