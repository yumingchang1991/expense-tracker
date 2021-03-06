if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const path = require('path')
const { engine } = require('express-handlebars')
const session = require('express-session')
const methodOverride = require('method-override')

const db = require('./config/mongoose')
const usePassport = require('./config/passport')
const routes = require('./routes')
const flash = require('connect-flash')

const app = express()

app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, '/public')))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

usePassport(app)
app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.successMsg = req.flash('successMsg')
  res.locals.failureMsg = req.flash('failureMsg')
  next()
})

app.use(routes)



app.listen(process.env.PORT ,() => console.log(`Express server is now listening on port:${process.env.PORT}...`))