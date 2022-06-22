const router = require('express').Router()
const Record = require('../../models/record')
const formatDateString = require('../../utils/formatDateString')

router.route('/').get((req, res) => {
  Record
    .find({ userId: req.user._id })
    .populate('categoryId')
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      // calculate total amount
      const totalAmount = records.reduce((sum, record) => {
        return sum += record.amount
      }, 0)
      
      // format date string to YYYY-mm-dd
      const recordsFormatted = records.map(record => {
        record.date = formatDateString(record.date)
        return record
      })
      
      res.render('index', { records: recordsFormatted, totalAmount })
    })
    .catch(err => console.log(err))
})

module.exports = router