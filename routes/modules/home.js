const router = require('express').Router()
const Record = require('../../models/record')
const formatDateString = require('../../utils/formatDateString')
const { isCategoryFilterSelected } = require('../../utils/isCategorySelected')

router.route('/').get((req, res) => {
  const categoryFilter = req.query.categoryFilter

  Record
    .find({ userId: req.user._id })
    .populate('categoryId')
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      // filter records by category
      const recordsFiltered = records.filter(record => {
        if (!categoryFilter || categoryFilter === '') {
          return true
        }
        return record.categoryId.name === categoryFilter
      })

      // calculate total amount
      const totalAmount = recordsFiltered.reduce((sum, record) => {
        return sum += record.amount
      }, 0)

      // format date string to YYYY-mm-dd
      const recordsFormatted = recordsFiltered.map(record => {
        record.date = formatDateString(record.date)
        return record
      })
      
      const contextObj = {
        totalAmount,
        records: recordsFormatted,
        categoryFilter,
        helpers: {
          isCategoryFilterSelected
        }
      }

      res.render('index', contextObj)
    })
    .catch(err => console.log(err))
})

module.exports = router