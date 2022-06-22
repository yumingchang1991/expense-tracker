if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Category = require('../category')

const CATEGORIES = require('../../dummyData/categories')

db.once('open', () => {
  Category
    .deleteMany()
    .then(() => Category.create(CATEGORIES))
    .then(() => console.log('category added'))
    .then(() => db.close())
    .catch(err => console.log(err))
})
