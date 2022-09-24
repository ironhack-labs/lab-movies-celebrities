const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: String,
    password: String,
    likes: {
        type: Schema.Types.ObjectId,
        ref: 'Movies'
    }
}, {
    timestamps: true
})

const User = model('User', userSchema);

module.exports = User;
