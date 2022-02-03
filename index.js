/* eslint-disable no-undef */
document.getElementById('player-name').innerText ="red's Turn"
document.getElementById('turn-display').style.backgroundColor ='red'
const audio = new Audio('discSound.mp3')
const click = new Audio('click.mp3')
const winner = new Audio('winner.mp3')

function clearBoard () {
  for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
    for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
      document.getElementById(`row${rowIndex}-col${columnIndex}`).style.backgroundColor = 'white'
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
      document.getElementById(`row${rowIndex}-col${columnIndex}`).classList.add('fall')
      audio.play()
    }
  }
}

function RecordNames (event) {
  click.play()
  gameState.redName = document.getElementById('redName').value
  gameState.yellowName = document.getElementById('yellowName').value
  // Bind the click events for the grid.
  for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
    for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
      const gridPosition = document.getElementById(`row${rowIndex}-col${columnIndex}`)
      gridPosition.addEventListener('click', positionClick)
    }
}
}

async function positionClick (event) {
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
  click.play()
  resetGame()
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      document.getElementById(`row${i}-col${j}`).style.backgroundColor = 'white'
      document.getElementById(`row${i}-col${j}`).addEventListener('click', positionClick)
      document.getElementById(`row${i}-col${j}`).classList.remove('fall')
    }
  }
  document.getElementById('player-name').innerText = `${gameState.playerTurn}'s Turn`
  document.getElementById('turn-display').style.backgroundColor = 'red'
}

function resetAll (event) {
  click.play()
  location.reload()
}

// Bind the click event for the reset button.
const resetButton = document.getElementById('resetButton')
resetButton.addEventListener('click', resetGrid)

const resetAllButton = document.getElementById('resetAllButton')
resetAllButton.addEventListener('click', resetAll)

const nameButton = document.getElementById('name-bottom-close')
nameButton.addEventListener('click', RecordNames)

// Modal class functions
const modal = document.getElementById('myModal')
document.getElementById('bottom-close').onclick = function () {
  click.play()
  modal.style.display = 'none'}

function openModal () {
  modal.style.display = 'block'
  winner.play()
}

const playerModal = document.getElementById('myModalPlayer')
document.getElementById('name-bottom-close').onclick = function () {
  playerModal.style.display = 'none'}
