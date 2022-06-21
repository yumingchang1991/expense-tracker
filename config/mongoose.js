require('dotenv').config()

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)
// useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex are no longer supported options. Mongoose 6 always behaves as if useNewUrlParser, useUnifiedTopology, and useCreateIndex are true, and useFindAndModify is false. Please remove these options from your code.
// https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options

const db = mongoose.connection

db.on('error', () => console.log('mongoDb connection error'))
db.once('open', () => console.log('mongoDb is connected'))

module.exprts = db