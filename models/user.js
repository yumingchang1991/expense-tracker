const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Model = mongoose.model

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
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
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const User = Model('User', userSchema)
module.exports = User
