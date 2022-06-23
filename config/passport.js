const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local')
const User = require('../models/user')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    verifyLocal
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err))
  })
}

function verifyLocal(req, email, password, done) {
  User
    .findOne({ email })
    .then(user => {
      if (!user) {
        req.flash('failureMsg', '電子信箱未註冊，請先註冊為會員')
        return done(null, false, { message: '電子信箱未註冊，請先註冊為會員' })
      }
      return bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            req.flash('failureMsg', '密碼錯誤')
            return done(null, false, { message: '密碼錯誤' })
          }
          return done(null, user)
        })
        .catch(err => done(err))
    })
    .catch(err => done(err))
}
