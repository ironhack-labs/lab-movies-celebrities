const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String, 
        required: [true, "Username is required"],
        unique: true,
        //match: [ /^\S+@\S+\.\S+$/ , "Please input a valid email"],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
});

const User = mongoose.model('User', userSchema);


module.exports = User;