const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const serveStatic = require('serve-static')
const path = require('path')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const dbuser = process.env.DB_USER
const dbpassword = process.env.DB_PASSWORD
const mongoURI = `mongodb://${dbuser}:${dbpassword}@ds123181.mlab.com:23181/simply-do`

mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use('/api/list', require('./routes/api/lists'))

if (process.env.NODE_ENV === 'production') {
  app.use(serveStatic('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server started on port ${port}`))
