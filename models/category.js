const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Model = mongoose.model

const categorySchema = new Schema({
  id: {
    type: Number,
    unique: true
  },
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    uppercase: true,
  }
})

const Category = Model('Category', categorySchema)
module.exports = Category
