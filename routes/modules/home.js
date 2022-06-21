const router = require('express').Router()

router.route('/').get((req, res) => {
  res.redirect('/users/login')
})

module.exports = router