const express = require('express')
const router = express.Router()

const List = require('../../models/List')

router.get('/:id/exists', (req, res) => {
  List.findById(req.params.id).then(list => res.json({ exists: list !== null }))
})

router.get('/:id/items', (req, res) => {
  List.findById(req.params.id.toLowerCase())
    .sort({ created_at: -1 })
    .then(list => {
      list.last_accessed_at = Date.now()
      list.save()
      res.json(list.items)
    })
    .catch(err => res.status(400).json(err))
})

router.post('/:id', (req, res) => {
  const newList = new List({
    _id: req.params.id,
    items: []
  })

  newList
    .save()
    .then(list => res.json(list))
    .catch(err => res.status(400).json(err))
})

router.post('/:id/items', (req, res) => {
  const newItem = new Item(req.body)

  List.findById(req.params.id)
    .then(list => {
      list.last_accessed_at = Date.now()
      list.items.push(newItem)
      list.save().then(_ => res.json(newItem))
    })
    .catch(err => res.status(400).json(err))
})

router.put('/:id/items/:itemId', (req, res) => {
  List.findById(req.params.id)
    .then(list => {
      let item = list.items.id(req.params.itemId)
      if (req.body.text !== undefined) {
        item.text = req.body.text
      }
      if (req.body.checked !== undefined) {
        item.checked = req.body.checked
      }
      timeNow = Date.now()
      list.last_accessed_at = timeNow
      item.updated_at = timeNow
      list.save().then(_ => res.json(item))
    })
    .catch(err => res.status(400).json(err))
})

router.delete('/:id/items/:itemId', (req, res) => {
  List.findById(req.params.id)
    .then(list => {
      list.last_accessed_at = Date.now()
      list.items.id(req.params.itemId).remove()
      list.save().then(_ => res.json({ success: true }))
    })
    .catch(err => res.status(400).json(err))
})

module.exports = router
