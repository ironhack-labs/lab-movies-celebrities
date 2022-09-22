//COLLEcTIONS are DETERMINED BY THE SCHEMEA NAME!!!!!!

// models/User.model.js
const { Schema, model } = require('mongoose');
 
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,// removes extra space at before or and of word
      required: [true, 'Username is required.'],
      unique: true// there can only be one
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      // this match will disqualify all the emails with accidental empty spaces, missing dots in front of (.)com and the ones with no domain at all
      match: [/^\S+@\S+\.\S+$/, 'USE EMAIL ADDRESS FORMAT!.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required.']
    },

    likedMovies:  [{
      type: Schema.Types.ObjectId,
      ref: 'Movie',
      unique: true
  }]

    //need to add a "likedMovies" key and it is an array that takes stuff.
  },
  {
    timestamps: true
  }
);
 
module.exports = model('User', userSchema);