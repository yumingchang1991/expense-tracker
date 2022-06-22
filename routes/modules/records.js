const router = require('express').Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.route('/:id/edit').get((req, res) => {
  Record
    .findById(req.params.id)
    .lean()
    .then(record => {
      if (!record) {
        return console.log('cannot find record in database. id=', req.params.id)
      }
      return res.render('editRecord', { record })
    })
    .catch(err => console.log(err))
})

router.route('/new').get((req, res) => {
  return res.render('newRecord')
})

router.route('/new').post((req, res) => {
  const { name, date, category, amount } = req.body
  Category
    .findOne({ name: category })
    .lean()
    .then(category => {
      const userId = req.user._id
      const categoryId = category._id
      return Record.create({ name, date, amount, categoryId, userId })
    })
    .then(() => {
      return res.redirect('/')
    })
    .catch(err => console.log(err))
})

module.exports = router
