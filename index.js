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
  
  function clearBoard() {
    for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
      for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
        document.getElementById(`row${rowIndex}-col${columnIndex}`).style.backgroundColor = "white"
      }
    }
  }
  
  function drawBoard (grid) {
    clearBoard()
    for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
      for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
        if (!grid[rowIndex][columnIndex]) {
          continue
        }
        const color = grid[rowIndex][columnIndex]
        document.getElementById(`row${rowIndex}-col${columnIndex}`).style.backgroundColor = color
      }
    }
  }
  
  function RecordNames (event) {
    gameState.redName = document.getElementById('redName').value
    gameState.yellowName = document.getElementById('yellowName').value
  }
  
  function positionClick (event) {
    const id = event.target.id
    const column = id[8]
    const lowestavailablerow = getLowestAvailableRowInColumn(column, gameState.grid)
    takeTurn(lowestavailablerow, column)
    const grid = gameState.grid
    document.getElementById('player-name').innerText = `${gameState.playerTurn}'s Turn` ? `${gameState.playerTurn}'s Turn` : "red's Turn"
    document.getElementById('turn-display').style.backgroundColor = gameState.playerTurn ? gameState.playerTurn : 'red'
    drawBoard(grid)
    const winner = checkWinner(grid)
    if (winner !== null) {
      // update score and send to server
      gameState.winnerScore += gameState.emptySpaces
      if (winner === 'red') {
        gameState.winnerName = gameState.redName
        const winnerName = document.getElementById('winner-name')
        winnerName.innerText = gameState.winnerName
        document.getElementById('modal-header').style.backgroundColor = winner
        postScores().then(fetchScores)
        openModal()
      } else if (winner === 'yellow') {
        gameState.winnerName = gameState.yellowName
        const winnerName = document.getElementById('winner-name')
        winnerName.innerText = gameState.winnerName
        document.getElementById('modal-header').style.backgroundColor = winner
        postScores().then(fetchScores)
        openModal()
      } else if (winner === 'nobody') {
        const winnerName = document.getElementById('winner-name')
        winnerName.innerText = 'nobody'
        document.getElementById('modal-header').style.backgroundColor = 'pink'
        fetchScores()
        openModal()
      }
      for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
        for (let colIndex = 0; colIndex < 7; colIndex++) {
          document.getElementById(`row${rowIndex}-col${colIndex}`).removeEventListener('click', positionClick)
        }
      }
      console.log(gameState)
    }
  }
  
  // The reset button was clicked, call the game's reset function then reset the DOM.
  function resetGrid (event) {
    resetGame()
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        document.getElementById(`row${i}-col${j}`).style.backgroundColor = 'white'
        document.getElementById(`row${i}-col${j}`).addEventListener('click', positionClick)
      }
    }
    document.getElementById('player-name').innerText = `${gameState.playerTurn}'s Turn`
    document.getElementById('turn-display').style.backgroundColor = 'red'
  }
  
  // Bind the click events for the grid.
  for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
    for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
      const gridPosition = document.getElementById(`row${rowIndex}-col${columnIndex}`)
      gridPosition.addEventListener('click', positionClick)
    }
  }
  
  // Bind the click event for the reset button.
  const resetButton = document.getElementById('resetButton')
  resetButton.addEventListener('click', resetGrid)
  
  const nameButton = document.getElementById('nameButton')
  nameButton.addEventListener('click', RecordNames)
  
  // Modal class functions
  const modal = document.getElementById('myModal')
  
  document.getElementById('bottom-close').onclick = function () {
    modal.style.display = 'none'}
  
  function openModal () {
    modal.style.display = 'block'
  }
  