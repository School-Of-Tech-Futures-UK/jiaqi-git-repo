const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs').promises;

app.use(bodyParser.json()) // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // to support URL-encoded bodies
app.use(express.json()) // to support JSON-encoded bodies
app.use(cors())

let scores 

async function loadScores () {
  const contents = await fs.readFile('./data.json', 'utf-8')
  const data = JSON.parse(contents)
  scores=data
}

async function saveScores (scores) {
  const contents = JSON.stringify(scores)
  await fs.writeFile('./data.json', contents)
}


app.get('/connect-4', (req, res) => {
  res.json(scores)
})


loadScores ()
app.post('/connect-4', (req, res) => {
  data = req.body
  scores.push(data)
  saveScores(scores)
  res.send('')
})

app.listen(3000)
