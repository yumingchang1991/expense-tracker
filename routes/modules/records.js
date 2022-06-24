const router = require('express').Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const formatDateString = require('../../utils/formatDateString')
const { isCategorySelected } = require('../../utils/isCategorySelected')

router.route('/:id/edit').get(async (req, res) => {
  Record
    .findById(req.params.id)
    .populate('categoryId')
    .lean()
    .then(record => {
      if (!record) {
        return console.log('cannot find record in database. id=', req.params.id)
      }
      // format date into YYYY-MM-DD to set default value
      record.date = formatDateString(record.date)

      // render handlebars template with helper function to decide which category is default
      return res.render('editRecord',
        { 
          record,
          helpers: { isCategorySelected }
        }
      )
    })
    .catch(err => console.log(err))
})

router.route('/:id').put((req, res) => {
  Record
    .findByIdAndUpdate(
      req.params.id,
      { ...req.body }
    )
    .then(() => {
      req.flash('successMsg', 'successfully edited an expense')
      res.redirect('/')
    })
    .catch(err => console.log(err))
})

router.route('/:id').delete((req, res) => {
  Record
    .findByIdAndDelete(req.params.id)
    .then(() => {
      req.flash('failureMsg', 'an expensed is removed')
      res.redirect('/')
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
      req.flash('successMsg', 'an expense is added')
      res.redirect('/')
    })
    .catch(err => console.log(err))
})

module.exports = router
