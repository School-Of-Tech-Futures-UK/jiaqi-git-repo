const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(bodyParser.json()) // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // to support URL-encoded bodies
app.use(express.json()) // to support JSON-encoded bodies
app.use(cors())

const scores = { red: 0, yellow: 0 }
app.get('/connect-4', (req, res) => {
  res.json(scores)
})

app.post('/connect-4', (req, res) => {
  scores.red = req.body.red
  scores.yellow = req.body.yellow
  res.send(scores)
})

app.listen(3000)
