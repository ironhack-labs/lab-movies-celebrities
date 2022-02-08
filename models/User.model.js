const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    required: [true, "Username is mandatory!"],
    type: String,
    unique: true,
  },
  password: {
    required: [true, "You forgot to insert the password"],
    type: String,
  },
});

const User = model("User", userSchema);

module.exports = User;
