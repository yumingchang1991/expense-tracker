const bcrypt = require('bcryptjs')

const db = require('../../config/mongoose')

const User = require('../user')
const Record = require('../record')
const Category = require('../category')

const USERS = require('../../dummyData/users')
const RECORDS = require('../../dummyData/records')

// Connection ready state
// 0 = disconnected
// 1 = connected
// 2 = connecting
// 3 = disconnecting

db.once('open', () => {
  Category
    .find()
    .lean()
    .then(categories => {
      RECORDS.forEach(record => {
        const categoryId = categories.filter(category => category.name === record.category.toUpperCase())[0]._id
        record.categoryId = categoryId
      })
      return Promise.resolve()
    })

    // initialize MongoDB
    .then(() => User.deleteMany())
    .then(() => Record.deleteMany())

    // create users, then records
    .then(() => {
      return Promise.all(
        USERS.map(user => {
          return bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(user.password, salt))
            .then(hashed => {
              user.password = hashed
            })
        })
      )
    })
    .then(() => User.create(USERS))
    .then(users => {
      return Promise.all(
        users.map(user => {
          const recordsToCreate = RECORDS.map(record => {
            record.userId = user._id
            return record
          })
          return Record.create(recordsToCreate)
        })
      )
    })
    .then(() => {
      console.log('Users and Records are created ...\n')
      console.log('Terminating program ...')
      db.close()
    })
})

module.exports = USERS