const mongoose = require('mongoose')
const Item = require('./Item')

const ListSchema = new mongoose.Schema({
  _id: String,
  items: {
    type: [Item.schema],
    required: true
  }
})

module.exports = List = mongoose.model('List', ListSchema)
