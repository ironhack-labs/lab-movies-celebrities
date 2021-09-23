// models/User.js

// 1. IMPORTACIONES
const mongoose = require('mongoose')

// 2. SCHEMA

const userSchema = mongoose.Schema({
  username: String,
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required']
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ] // one to many - BASE DE DATOS
})

// 3. MODELO
const User = mongoose.model('User', userSchema)

// 4. EXPORTACIÓN
module.exports = User
