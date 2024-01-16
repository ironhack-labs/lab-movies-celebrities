const {Schema, model} = require("mongoose");

const userSchema = new Schema ({
    username: {type: String, unique: true, required: true },
    email: {type: String, unique: true, required: true },
    password: {type: String, unique: true, required: true },
},
{
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
});

module.exports = model ("User", userSchema);