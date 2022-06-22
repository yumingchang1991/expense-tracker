const router = require('express').Router()
const Record = require('../../models/record')

router.route('/').get((req, res) => {
  Record
    .find({ userId: req.user._id })
    .populate('categoryId')
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      const totalAmount = records.reduce((sum, record) => {
        return sum += record.amount
      }, 0)
      res.render('index', { records, totalAmount })
    })
    .catch(err => console.log(err))
})

module.exports = router