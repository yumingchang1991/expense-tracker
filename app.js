if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const { engine } = require('express-handlebars')
const session = require('express-session')
const methodOverride = require('method-override')

const db = require('./config/mongoose')
const usePassport = require('./config/passport')
const routes = require('./routes')

const app = express()

app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

usePassport(app)

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

app.use(routes)



app.listen(process.env.PORT ,() => console.log(`Express server is now listening on port:${process.env.PORT}...`))