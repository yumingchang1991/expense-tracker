const router = require('express').Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')
const DummyUsers = require('../../dummyData/users')

router.route('/login').get((req, res) => {
  res.render('login', { DummyUser: DummyUsers[0] })
})

router.route('/login').post(passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.route('/:id/edit').get((req, res) => {
  res.render('editUser')
})

router.route('/:id').get((req, res) => {
  res.render('profile')
})

router.route('/:id').put((req, res) => {
  const { name, displayName } = req.body
  User
    .findByIdAndUpdate(req.user._id, { name, displayName })
    .then(() =>{
      req.flash('successMsg', 'your profile is updated')
      res.redirect('/users/:id')
    })
    .catch(err => console.log(err))
})

router.route('/:id/logout').get((req, res, next) => {
  req.logout(err => {
    if (err) return next(err)
    req.flash('successMsg', 'logout successfully')
    res.redirect('/users/login')
  })
})

router.route('/register').get((req, res) => {
  res.render('register')
})

router.route('/register').post((req, res) => {
  const { name, displayName, email, password, confirmPassword } = req.body
  const userInput = { name, displayName, email }
  // ensure password and confirmPassword are the same
  if (password !== confirmPassword) {
    req.flash('failureMsg', 'password does not align with confirm password')
    return res.render('register', { userInput })
  }

  // ensure name is filled
  if (!name) {
    req.flash('failureMsg', 'please fill in your name in profile section')
    return res.render('register', { userInput })
  }

  // ensure email is not registered
  User
    .findOne({ email })
    .then(user => {
      if (user) {
        req.flash('failureMsg', `this email address is already registered: ${email}`)
        return res.redirect('/users/login')
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
    .then(() => {
      req.flash('successMsg', 'Congratulations! You are our memeber now!')
      res.redirect('/users/login')
    })
    .catch(err => console.log('error when creating new user in mongo DB\n' ,err))
})

module.exports = router
