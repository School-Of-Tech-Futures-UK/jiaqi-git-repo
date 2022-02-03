/* eslint-disable no-undef */
// Function to post scores to the server
async function postScores () {
  const scores = { name: gameState.winnerName, score: gameState.winnerScore }
  const resp = await fetch('http://localhost:3002/connect-4/scores', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(scores)
  })
  console.log('Success:', resp)
}

// function to get scores from server
async function fetchScores () {
  const resp = await fetch('http://localhost:3002/connect-4/scores')
  const respJson = await resp.json()
  const sortedScores = (respJson.sort((a, b) => b.score - a.score))
  const scoreboard = document.getElementById('scoreboard')
  scoreboard.innerHTML = ''
  scoreboard.style.display = 'block'
  for (let i = 0; i < sortedScores.length; i++) {
    if (i < 10) {
      const listHighscores = document.createElement('li')
      listHighscores.innerHTML = `${sortedScores[i].name}: ${sortedScores[i].score}`
      scoreboard.appendChild(listHighscores)
    }
  }
  console.log(sortedScores)
}

if (typeof exports === 'object') {
  module.exports = {
    postScores,
    fetchScores
  }
}
