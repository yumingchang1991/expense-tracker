const router = require('express').Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')

router.route('/login').get((req, res) => {
  res.render('login')
})

router.route('/login').post(passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.route('/:id/edit').get((req, res) => {
  res.render('editUser')
})

router.route('/:id').put((req, res) => {
  const { name, displayName } = req.body
  User
    .findByIdAndUpdate(req.user._id, { name, displayName })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.route('/:id/logout').get((req, res) => {
  req.logout(err => {
    if (err) {
      return console.log('error when logging user out\n', err)
    }
    return res.render('login')
  })
})

router.route('/register').get((req, res) => {
  res.render('register')
})

router.route('/').post((req, res) => {
  const { name, displayName, email, password, confirmPassword } = req.body
  // ensure password and confirmPassword are the same
  if (password !== confirmPassword) {
    return res.redirect('/users/login')
  }

  // ensure name is filled
  if (!name) {
    return res.redirect('/users/login')
  }

  // ensure email is not registered
  User
    .findOne({ email })
    .then(user => {
      if (user) {
        return res.redirect('users/login')
        // todo: user already exists -> login and display message
      }
      return bcrypt.genSalt(10)
    })
    .then(salt => bcrypt.hash(password, salt))
    .then(hashed => {
      return User.create({
        name,
        displayName: displayName ? displayName : name,
        email,
        password: hashed
      })
    })
    .then(newUser => {
      res.redirect('/users/login')
    })
    .catch(err => console.log('error when creating new user in mongo DB\n' ,err))
})

module.exports = router
