if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Category = require('../category')

const CATEGORIES = [
  { name: '家居物業', iconClass: 'fa-2xl fa-solid fa-house' },
  { name: '交通出行', iconClass: 'fa-2xl fa-solid fa-van-shuttle' },
  { name: '休閒娛樂', iconClass: 'fa-2xl fa-solid fa-face-grin-beam' },
  { name: '餐飲食品', iconClass: 'fa-2xl fa-solid fa-utensils' },
  { name: '其他', iconClass: 'fa-2xl fa-solid fa-pen' }
]

db.once('open', () => {
  Category
    .create(CATEGORIES)
    .then(() => console.log('category added'))
    .then(() => db.close())
})


// const CATEGORY = {
//   家居物業: "fa-solid fa-house",
//   交通出行: "fa-solid fa-van-shuttle",
//   休閒娛樂: "fa-solid fa-face-grin-beam",
//   餐飲食品: "fa-solid fa-utensils",
//   其他: "fa-solid fa-pen"
// }
