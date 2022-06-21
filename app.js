if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const { engine } = require('express-handlebars')

const db = require('./config/mongoose')
const routes = require('./routes')

const app = express()

app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(routes)

app.listen(process.env.PORT ,() => console.log(`Express server is now listening on port:${process.env.PORT}...`))