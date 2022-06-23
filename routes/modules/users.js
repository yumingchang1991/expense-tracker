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

router.route('/:id').put((req, res) => {
  const { name, displayName } = req.body
  User
    .findByIdAndUpdate(req.user._id, { name, displayName })
    .then(() =>{
      req.flash('successMsg', '已成功修改會員資料')
      res.redirect('/')
    })
    .catch(err => console.log(err))
})

router.route('/:id/logout').get((req, res, next) => {
  req.logout(err => {
    if (err) return next(err)
    req.flash('successMsg', '已成功登出')
    res.redirect('/users/login')
  })
})

router.route('/register').get((req, res) => {
  res.render('register')
})

router.route('/').post((req, res) => {
  const { name, displayName, email, password, confirmPassword } = req.body
  // ensure password and confirmPassword are the same
  if (password !== confirmPassword) {
    req.flash('failureMsg', '輸入的密碼不一致，請確保密碼一致')
    return res.redirect('/users/register')
  }

  // ensure name is filled
  if (!name) {
    req.flash('failureMsg', '姓名為必填欄位')
    return res.redirect('/users/register')
  }

  // ensure email is not registered
  User
    .findOne({ email })
    .then(user => {
      if (user) {
        req.flash('failureMsg', '信箱已註冊，請直接登入')
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
      req.flash('successMsg', '已成功註冊會員')
      res.redirect('/users/login')
    })
    .catch(err => console.log('error when creating new user in mongo DB\n' ,err))
})

module.exports = router
