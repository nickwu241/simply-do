const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
  text: {
    type: String,
    default: ''
  },
  checked: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = Item = mongoose.model('Item', ItemSchema)
