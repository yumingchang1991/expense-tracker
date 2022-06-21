if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const db = require('./config/mongoose')

const app = express()

app.listen(process.env.PORT ,() => console.log(`Express server is now listening on port:${process.env.PORT}...`))