const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Model = mongoose.model

const categorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    uppercase: true,
  },
  iconClass: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  }
})

const Category = Model('Category', categorySchema)
module.exports = Category
