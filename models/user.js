const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Model = mongoose.model

const userSchema = new Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  displayName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
})

const User = Model('User', userSchema)
module.exports = User
